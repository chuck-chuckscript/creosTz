export interface Comment{
    id: number
    issue: string
    designer: {
        avatar: string
        username: string
        thumbnails: {
            "avatar": string,
            "avatar_2x": string,
            "avatar_webp": string,
            "avatar_webp_2x": string
        }
    },
    date_created: string
    message: string
}

export interface TopDesigner {
    avatar: string
    username: string
    maxCountIssues: number
    avgTimeDone: number
}


type Status = 'New' | 'Done' | 'In Progress'

export interface DesignerIssue {
    "key": string,
    "date_created": string,
    "status": Status
    "date_finished_by_designer": string | null
}

export interface Designer {
    "avatar": string,
    "username": string,
    "email" : string,
    "issues" : DesignerIssue[]
}

export interface ShortInfoIssueDesigner{
    "id": number,
    "status": Status,
    "designer": string,
    "project": string,
    "date_created": string,
    date_started_by_designer: string
    date_finished_by_designer: string
}

export interface Issue{
    "id": number,
    "status": Status,
    "designer": string,
    "project": string,
    "date_created": string,
    "summary": string,
    "received_from_client": number,
    "send_to_project_manager": number,
    "send_to_account_manager": number,
    "send_to_designer": number,
    "date_updated": string,
    "date_started_by_designer": string,
    "date_finished_by_designer": string,
    "date_finished": string
}

export interface StatusStat{
    name: string
    value: number
    color: string
}