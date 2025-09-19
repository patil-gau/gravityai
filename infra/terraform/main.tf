# Gravity AI Infrastructure - Main Configuration

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }

  # Backend configuration for state management
  # backend "gcs" {
  #   bucket = "gravity-ai-terraform-state"
  #   prefix = "environments/${var.environment}/terraform.tfstate"
  # }
}

# Provider configuration
provider "google" {
  project = var.project_id
  region  = var.region

  default_labels = {
    project     = "gravity-ai"
    environment = var.environment
    managed-by  = "terraform"
    owner       = var.owner
  }
}

provider "google-beta" {
  project = var.project_id
  region  = var.region

  default_labels = {
    project     = "gravity-ai"
    environment = var.environment
    managed-by  = "terraform"
    owner       = var.owner
  }
}

# Data sources
data "google_client_config" "current" {}
data "google_project" "current" {}
