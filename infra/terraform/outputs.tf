# Gravity AI Infrastructure - Outputs

output "project_id" {
  description = "Google Cloud Project ID"
  value       = data.google_project.current.project_id
}

output "project_number" {
  description = "Google Cloud Project Number"
  value       = data.google_project.current.number
}

output "region" {
  description = "GCP Region"
  value       = var.region
}

output "environment" {
  description = "Environment name"
  value       = var.environment
}

# Cloud Run outputs (when implemented)
# output "cloud_run_url" {
#   description = "Cloud Run service URL"
#   value       = google_cloud_run_service.api.status[0].url
# }

# output "cloud_run_service_name" {
#   description = "Cloud Run service name"
#   value       = google_cloud_run_service.api.name
# }

# Firebase outputs (when implemented)
# output "firebase_project_id" {
#   description = "Firebase project ID"
#   value       = google_firebase_project.default.project
# }

# output "firebase_hosting_url" {
#   description = "Firebase Hosting URL"
#   value       = "https://${var.firebase_project_id}.web.app"
# }

# Storage outputs (when implemented)
# output "storage_bucket_name" {
#   description = "Cloud Storage bucket name"
#   value       = google_storage_bucket.main.name
# }

# output "temp_bucket_name" {
#   description = "Temporary storage bucket name"
#   value       = google_storage_bucket.temp.name
# }

# Pub/Sub outputs (when implemented)
# output "pubsub_topics" {
#   description = "Created Pub/Sub topics"
#   value       = { for topic in google_pubsub_topic.topics : topic.name => topic.id }
# }

# Firestore outputs (when implemented)
# output "firestore_database" {
#   description = "Firestore database"
#   value       = google_firestore_database.database.name
# }
