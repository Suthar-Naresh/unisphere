const conf = {
    endpoint: String(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT),
    project_id: String(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID),
    student_collection_id: String(process.env.EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID),
    university_collection_id: String(process.env.EXPO_PUBLIC_APPWRITE_UNIVERSITY_COLLECTION_ID),
    event_collection_id: String(process.env.EXPO_PUBLIC_APPWRITE_EVENT_COLLECTION_ID),
    db_id: String(process.env.EXPO_PUBLIC_APPWRITE_DB_ID),
    bucket_id: String(process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID),
    organizers_team_id: String(process.env.EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID),
    function_id: String(process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_ID),
    event_attend_collection_id: String(process.env.EXPO_PUBLIC_APPWRITE_EVENT_ATTEND_COLLECTION_ID),
}

export default conf;