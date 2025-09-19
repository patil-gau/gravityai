# Staging Environment Configuration

environment = "staging"
aws_region  = "us-east-1"
owner       = "gravity-ai-team"

# Network configuration
vpc_cidr           = "10.1.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

# Application configuration
app_image_tag = "staging-latest"
api_image_tag = "staging-latest"

# Scaling configuration
min_capacity     = 2
max_capacity     = 6
desired_capacity = 2
