#!/bin/bash

# Gravity AI API - Cloud Run Deployment Script
# Usage: ./deploy.sh [environment] [image-tag]

set -euo pipefail

# Configuration
PROJECT_ID="gravityai-64e30"
REGION="asia-south1"
SERVICE_NAME="gravity-ai-api"
DEFAULT_TAG="latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
    echo "Usage: $0 [environment] [image-tag]"
    echo ""
    echo "Environments: dev, staging, prod"
    echo "Image tag: Docker image tag (default: latest)"
    echo ""
    echo "Examples:"
    echo "  $0 dev"
    echo "  $0 staging v1.2.0"
    echo "  $0 prod latest"
}

# Validate environment
validate_environment() {
    local env="$1"
    case "$env" in
        dev|staging|prod)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Set environment-specific configuration
set_environment_config() {
    local env="$1"
    
    case "$env" in
        dev)
            ALLOWED_ORIGINS="http://localhost:3000,https://localhost:3000"
            MAX_INSTANCES="3"
            MIN_INSTANCES="0"
            CPU="500m"
            MEMORY="512Mi"
            ;;
        staging)
            ALLOWED_ORIGINS="https://staging.gravity-ai.com,https://gravityai-64e30--staging.web.app"
            MAX_INSTANCES="5"
            MIN_INSTANCES="1"
            CPU="1000m"
            MEMORY="1Gi"
            ;;
        prod)
            ALLOWED_ORIGINS="https://gravity-ai.com,https://gravityai-64e30.web.app"
            MAX_INSTANCES="10"
            MIN_INSTANCES="2"
            CPU="1000m"
            MEMORY="1Gi"
            ;;
    esac
}

# Main deployment function
deploy_to_cloud_run() {
    local env="$1"
    local tag="$2"
    local image="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${tag}"
    local service_name="${SERVICE_NAME}-${env}"
    
    log_info "Deploying ${image} to Cloud Run service: ${service_name}"
    
    # Deploy to Cloud Run
    gcloud run deploy "${service_name}" \
        --image="${image}" \
        --region="${REGION}" \
        --platform=managed \
        --allow-unauthenticated \
        --set-env-vars="ENVIRONMENT=${env}" \
        --set-env-vars="ALLOWED_ORIGINS=${ALLOWED_ORIGINS}" \
        --memory="${MEMORY}" \
        --cpu="${CPU}" \
        --max-instances="${MAX_INSTANCES}" \
        --min-instances="${MIN_INSTANCES}" \
        --concurrency=80 \
        --timeout=300s \
        --port=8000 \
        --project="${PROJECT_ID}"
    
    # Get service URL
    local service_url=$(gcloud run services describe "${service_name}" \
        --region="${REGION}" \
        --project="${PROJECT_ID}" \
        --format="value(status.url)")
    
    log_success "Deployment completed successfully!"
    log_info "Service URL: ${service_url}"
    log_info "Health check: ${service_url}/healthz"
}

# Build and push image
build_and_push() {
    local tag="$1"
    local image="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${tag}"
    
    log_info "Building Docker image: ${image}"
    
    # Build image
    docker build -t "${image}" .
    
    # Push to Container Registry
    docker push "${image}"
    
    log_success "Image built and pushed: ${image}"
}

# Main execution
main() {
    # Parse arguments
    local environment="${1:-}"
    local image_tag="${2:-$DEFAULT_TAG}"
    
    if [[ -z "$environment" ]]; then
        log_error "Environment argument is required"
        show_usage
        exit 1
    fi
    
    if ! validate_environment "$environment"; then
        log_error "Invalid environment: $environment"
        show_usage
        exit 1
    fi
    
    log_info "Starting deployment process..."
    log_info "Environment: $environment"
    log_info "Image tag: $image_tag"
    log_info "Project: $PROJECT_ID"
    log_info "Region: $REGION"
    
    # Set environment configuration
    set_environment_config "$environment"
    
    # Confirm deployment
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Deployment cancelled"
        exit 0
    fi
    
    # Build and push image (optional - uncomment if building locally)
    # build_and_push "$image_tag"
    
    # Deploy to Cloud Run
    deploy_to_cloud_run "$environment" "$image_tag"
    
    log_success "Deployment process completed!"
}

# Run main function
main "$@"
