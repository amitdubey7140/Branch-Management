import { Gender } from "../utils/enums";

export interface AddOrganisationModel {
  orgId: number;
  orgName: string;
  description: string;
  branchList: AddBranchModel[];
  employees: SetAdmin[];
}

export interface AddBranchModel {
  branchId: number;
  branchName: string;
  location: string;
  organisation: { orgId: number; orgName: string };
  employeeList?: SetAdmin[];
}
export interface SetAdmin {
  empId: number;
  empName: string;
  salary: number;
  mobileNo: string;
  password: string;
  confirmPassword?: string;
  roleType: string;
  dateOfJoin: string;
  gender: Gender;
  email: string;
  branch: { branchId: number };
  organisation: { orgId: number; orgName: string };
}


export interface FilterModel {
  orgId: string;
  fromDate: string;
  toDate: string;
  searchKey:string;
  offset: number;
  pageSize: number;
}