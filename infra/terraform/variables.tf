# Gravity AI Infrastructure - Variables

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
  default     = "gravityai-64e30"
}

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "asia-south1"
}

variable "zone" {
  description = "GCP zone for zonal resources"
  type        = string
  default     = "asia-south1-a"
}

variable "owner" {
  description = "Owner of the infrastructure"
  type        = string
  default     = "gravity-ai-team"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "gravity-ai"
}

# Firebase Configuration
variable "firebase_project_id" {
  description = "Firebase project ID (usually same as GCP project)"
  type        = string
  default     = "gravityai-64e30"
}

variable "firebase_location" {
  description = "Firebase default location"
  type        = string
  default     = "asia-south1"
}

# Cloud Run Configuration
variable "cloud_run_service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "gravity-ai-api"
}

variable "container_image" {
  description = "Container image for Cloud Run"
  type        = string
  default     = "gcr.io/gravityai-64e30/gravity-ai-api:latest"
}

variable "min_instances" {
  description = "Minimum number of Cloud Run instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of Cloud Run instances"
  type        = number
  default     = 10
}

variable "cpu_limit" {
  description = "CPU limit for Cloud Run instances"
  type        = string
  default     = "1000m"
}

variable "memory_limit" {
  description = "Memory limit for Cloud Run instances"
  type        = string
  default     = "1Gi"
}

# Storage Configuration
variable "storage_bucket_name" {
  description = "Name of the Cloud Storage bucket"
  type        = string
  default     = "gravity-ai-storage"
}

variable "temp_bucket_name" {
  description = "Name of the temporary storage bucket"
  type        = string
  default     = "gravity-ai-temp"
}

# Pub/Sub Configuration
variable "pubsub_topics" {
  description = "List of Pub/Sub topics to create"
  type        = list(string)
  default     = ["inbound-msg", "digests-daily", "digests-weekly"]
}

# Firestore Configuration
variable "firestore_database_type" {
  description = "Firestore database type"
  type        = string
  default     = "FIRESTORE_NATIVE"
}

variable "firestore_location_id" {
  description = "Firestore location ID"
  type        = string
  default     = "asia-south1"
}
