# Production Environment Configuration

environment = "prod"
project_id  = "gravityai-64e30"
region      = "asia-south1"
zone        = "asia-south1-a"
owner       = "gravity-ai-team"

# Firebase configuration
firebase_project_id = "gravityai-64e30"
firebase_location   = "asia-south1"

# Cloud Run configuration
cloud_run_service_name = "gravity-ai-api"
container_image        = "gcr.io/gravityai-64e30/gravity-ai-api:v1.0.0"
min_instances          = 2
max_instances          = 20
cpu_limit              = "1000m"
memory_limit           = "1Gi"

# Storage configuration
storage_bucket_name = "gravity-ai-storage"
temp_bucket_name    = "gravity-ai-temp"

# Pub/Sub configuration
pubsub_topics = ["inbound-msg", "digests-daily", "digests-weekly"]

# Firestore configuration
firestore_database_type = "FIRESTORE_NATIVE"
firestore_location_id   = "asia-south1"
