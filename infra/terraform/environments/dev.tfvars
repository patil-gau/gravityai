# Development Environment Configuration

environment = "dev"
aws_region  = "us-east-1"
owner       = "gravity-ai-dev-team"

# Network configuration
vpc_cidr           = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]

# Application configuration
app_image_tag = "dev-latest"
api_image_tag = "dev-latest"

# Scaling configuration
min_capacity     = 1
max_capacity     = 3
desired_capacity = 1
