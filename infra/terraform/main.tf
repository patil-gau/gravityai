# Gravity AI Infrastructure - Main Configuration

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend configuration for state management
  # backend "s3" {
  #   bucket = "gravity-ai-terraform-state"
  #   key    = "environments/${var.environment}/terraform.tfstate"
  #   region = "us-east-1"
  #   
  #   dynamodb_table = "gravity-ai-terraform-locks"
  #   encrypt        = true
  # }
}

# Provider configuration
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "gravity-ai"
      Environment = var.environment
      ManagedBy   = "terraform"
      Owner       = var.owner
    }
  }
}

# Data sources
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
