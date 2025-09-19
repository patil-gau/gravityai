# Gravity AI Infrastructure - Outputs

output "account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

output "region" {
  description = "AWS Region"
  value       = data.aws_region.current.name
}

output "environment" {
  description = "Environment name"
  value       = var.environment
}

# VPC outputs (when implemented)
# output "vpc_id" {
#   description = "VPC ID"
#   value       = aws_vpc.main.id
# }

# output "private_subnet_ids" {
#   description = "Private subnet IDs"
#   value       = aws_subnet.private[*].id
# }

# output "public_subnet_ids" {
#   description = "Public subnet IDs"
#   value       = aws_subnet.public[*].id
# }

# Application outputs (when implemented)
# output "web_url" {
#   description = "Web application URL"
#   value       = aws_lb.web.dns_name
# }

# output "api_url" {
#   description = "API URL"
#   value       = aws_lb.api.dns_name
# }
