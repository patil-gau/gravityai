# Gravity AI - Infrastructure

Infrastructure as Code (IaC) for the Gravity AI platform using Terraform and AWS.

## Purpose

This directory contains all infrastructure definitions and deployment scripts for managing the Gravity AI platform across multiple environments. Built with production-grade practices for security, scalability, and maintainability.

## Technology Stack

- **IaC Tool:** Terraform 1.0+
- **Cloud Provider:** AWS
- **State Management:** S3 + DynamoDB (configured but commented)
- **Deployment:** Bash scripts with environment validation

## Directory Structure

```
infra/
├── terraform/
│   ├── main.tf              # Main Terraform configuration
│   ├── variables.tf         # Input variables definition
│   ├── outputs.tf          # Output values definition
│   └── environments/       # Environment-specific configurations
│       ├── dev.tfvars      # Development environment
│       ├── staging.tfvars  # Staging environment
│       └── prod.tfvars     # Production environment
└── scripts/
    └── deploy.sh           # Deployment automation script
```

## Prerequisites

- **Terraform** 1.0 or later
- **AWS CLI** configured with appropriate credentials
- **Bash** shell (macOS/Linux)

## Environment Setup

### 1. AWS Configuration

Configure AWS credentials for each environment:

```bash
# Configure AWS CLI
aws configure

# Or use environment variables
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

### 2. Terraform State Backend (Recommended for Production)

Uncomment and configure the S3 backend in `main.tf`:

```bash
# Create S3 bucket for state storage
aws s3 mb s3://gravity-ai-terraform-state

# Create DynamoDB table for state locking
aws dynamodb create-table \
    --table-name gravity-ai-terraform-locks \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

## Deployment

### Using the Deployment Script

The `deploy.sh` script provides a safe, validated way to deploy infrastructure:

```bash
# Navigate to scripts directory
cd scripts/

# Make script executable (if not already)
chmod +x deploy.sh

# Plan changes (safe to run anytime)
./deploy.sh dev plan
./deploy.sh staging plan
./deploy.sh prod plan

# Apply changes (requires confirmation)
./deploy.sh dev apply
./deploy.sh staging apply
./deploy.sh prod apply

# Destroy infrastructure (requires typing "DELETE")
./deploy.sh dev destroy
```

### Manual Terraform Commands

For advanced users, you can run Terraform directly:

```bash
cd terraform/

# Initialize
terraform init

# Select workspace
terraform workspace select dev

# Plan with environment-specific variables
terraform plan -var-file="environments/dev.tfvars"

# Apply changes
terraform apply -var-file="environments/dev.tfvars"
```

## Environment Configuration

### Development (`dev`)
- **Purpose:** Local development and testing
- **Resources:** Minimal, cost-optimized
- **Scaling:** 1-3 instances
- **Network:** 10.0.0.0/16

### Staging (`staging`)
- **Purpose:** Pre-production testing and validation
- **Resources:** Production-like but smaller scale
- **Scaling:** 2-6 instances
- **Network:** 10.1.0.0/16

### Production (`prod`)
- **Purpose:** Live production workloads
- **Resources:** Full production specifications
- **Scaling:** 3-20 instances with auto-scaling
- **Network:** 10.2.0.0/16

## Security Best Practices

- **IAM Roles:** Principle of least privilege
- **Network Security:** Private subnets for applications
- **Encryption:** At-rest and in-transit encryption enabled
- **Secrets Management:** AWS Systems Manager Parameter Store
- **State Security:** S3 bucket encryption and DynamoDB locking

## Terraform Modules (Future)

As the infrastructure grows, consider organizing into reusable modules:

```
terraform/
├── modules/
│   ├── vpc/              # VPC and networking
│   ├── compute/          # ECS/EKS cluster
│   ├── database/         # RDS instances
│   └── monitoring/       # CloudWatch, alarms
```

## Monitoring & Alerting

Infrastructure monitoring will include:
- **CloudWatch** for metrics and logs
- **AWS Config** for compliance monitoring
- **Cost monitoring** with budgets and alerts
- **Security monitoring** with GuardDuty

## Troubleshooting

### Common Issues

1. **State Lock:** If Terraform state is locked, identify and release:
   ```bash
   terraform force-unlock <lock-id>
   ```

2. **AWS Credentials:** Verify credentials and permissions:
   ```bash
   aws sts get-caller-identity
   ```

3. **Resource Limits:** Check AWS service quotas if resources fail to create

### Logs and Debugging

- Enable Terraform debug logging: `export TF_LOG=DEBUG`
- Check AWS CloudTrail for API call history
- Review AWS CloudFormation events for detailed error messages

## Cost Management

- Use `terraform plan` to review changes before applying
- Monitor costs with AWS Cost Explorer
- Tag all resources for cost allocation
- Use spot instances and reserved capacity where appropriate
