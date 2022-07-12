export interface IUserData {
  email: string;
  password: string;
}
export interface IUser {
  name: string;
  access_token: string;
}

export interface IProjectReport {
  id: number;
  project_id: string;
  start_date: string;
  end_date: string;
}

export interface IProjectData {
  id: number;
  project_id: number;
  client_name: string;
  client_email: string;
  client_id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  tick_id: number;
  name?: string;
  start_date:string;
  end_date:string;
  
  reports: IProjectReport[];
}
export type IProjectDataUpdated = Omit<IProjectData, 'reports'>;

export type IReportFullData = Omit<IProjectData, 'reports' | 'tick_id'> & {
  entries: IUserRecordData[];
  project: IProjectData;
  filename: any;
  tick_project_id: string;
};

export interface IUserRecordData {
  id: number;
  date: string;
  hours: string;
  notes: string;
  type_name: string;
  username: string;
  url: string;
  created_at: string;
  updated_at: string;
  tick_user_id: number;
  task_id: number;
  start_date: string;
  end_date: string;
  project_id: number;
}
export interface IProjects {
  projects: IProjectData[];
}

export interface IResponse<T> {
  data: T;
  message: string;
  code: boolean;
}
