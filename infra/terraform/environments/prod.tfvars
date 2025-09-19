# Production Environment Configuration

environment = "prod"
aws_region  = "us-east-1"
owner       = "gravity-ai-team"

# Network configuration
vpc_cidr           = "10.2.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

# Application configuration
app_image_tag = "v1.0.0"
api_image_tag = "v1.0.0"

# Scaling configuration
min_capacity     = 3
max_capacity     = 20
desired_capacity = 5
