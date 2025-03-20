export enum Role {
    MAIN_ADMIN = 'MAIN_ADMIN',
    SUB_ADMIN = 'SUB_ADMIN',
    STAFF = 'STAFF',
}


export enum SubSchoolStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
    
}
export enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }


  export enum PermissionEnum {
    MANAGE_SUBSCHOOLS = 'manage_subschools',
    VIEW_STUDENTS = 'view_students',
    GENERATE_REPORTS = 'generate_pdf',
    VIEW_DASHBOARD = 'view_dashboard',
  } 