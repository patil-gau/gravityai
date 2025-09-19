#!/bin/bash

# Gravity AI Deployment Script
# Usage: ./deploy.sh <environment> [plan|apply|destroy]

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="${SCRIPT_DIR}/../terraform"
ENVIRONMENTS=("dev" "staging" "prod")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_usage() {
    echo "Usage: $0 <environment> [action]"
    echo ""
    echo "Environments: ${ENVIRONMENTS[*]}"
    echo "Actions: plan (default), apply, destroy"
    echo ""
    echo "Examples:"
    echo "  $0 dev plan"
    echo "  $0 staging apply"
    echo "  $0 prod destroy"
}

validate_environment() {
    local env="$1"
    for valid_env in "${ENVIRONMENTS[@]}"; do
        if [[ "$env" == "$valid_env" ]]; then
            return 0
        fi
    done
    return 1
}

# Main execution
main() {
    if [[ $# -lt 1 ]]; then
        log_error "Environment argument is required"
        show_usage
        exit 1
    fi

    local environment="$1"
    local action="${2:-plan}"

    # Validate environment
    if ! validate_environment "$environment"; then
        log_error "Invalid environment: $environment"
        show_usage
        exit 1
    fi

    # Validate action
    case "$action" in
        plan|apply|destroy)
            ;;
        *)
            log_error "Invalid action: $action"
            show_usage
            exit 1
            ;;
    esac

    log_info "Starting Terraform $action for environment: $environment"

    # Change to terraform directory
    cd "$TERRAFORM_DIR"

    # Initialize Terraform
    log_info "Initializing Terraform..."
    terraform init

    # Select or create workspace
    log_info "Setting up workspace for $environment..."
    terraform workspace select "$environment" 2>/dev/null || terraform workspace new "$environment"

    # Run terraform command
    local tfvars_file="environments/${environment}.tfvars"
    
    case "$action" in
        plan)
            log_info "Running Terraform plan..."
            terraform plan -var-file="$tfvars_file"
            ;;
        apply)
            log_warning "This will apply changes to $environment environment!"
            read -p "Are you sure? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                log_info "Running Terraform apply..."
                terraform apply -var-file="$tfvars_file"
                log_success "Terraform apply completed successfully!"
            else
                log_info "Apply cancelled by user"
                exit 0
            fi
            ;;
        destroy)
            log_error "This will DESTROY all resources in $environment environment!"
            read -p "Are you absolutely sure? Type 'DELETE' to confirm: " confirmation
            if [[ "$confirmation" == "DELETE" ]]; then
                log_info "Running Terraform destroy..."
                terraform destroy -var-file="$tfvars_file"
                log_success "Terraform destroy completed!"
            else
                log_info "Destroy cancelled"
                exit 0
            fi
            ;;
    esac
}

# Run main function
main "$@"
