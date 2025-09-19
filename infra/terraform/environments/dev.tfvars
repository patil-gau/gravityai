# Development Environment Configuration

environment = "dev"
project_id  = "gravityai-64e30"
region      = "asia-south1"
zone        = "asia-south1-a"
owner       = "gravity-ai-dev-team"

# Firebase configuration
firebase_project_id = "gravityai-64e30"
firebase_location   = "asia-south1"

# Cloud Run configuration
cloud_run_service_name = "gravity-ai-api-dev"
container_image        = "gcr.io/gravityai-64e30/gravity-ai-api:dev-latest"
min_instances          = 0
max_instances          = 3
cpu_limit              = "500m"
memory_limit           = "512Mi"

# Storage configuration
storage_bucket_name = "gravity-ai-storage-dev"
temp_bucket_name    = "gravity-ai-temp-dev"

# Pub/Sub configuration
pubsub_topics = ["dev-inbound-msg", "dev-digests-daily", "dev-digests-weekly"]

# Firestore configuration
firestore_database_type = "FIRESTORE_NATIVE"
firestore_location_id   = "asia-south1"
