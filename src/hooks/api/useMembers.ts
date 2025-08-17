import { useApiGet, useApiPost } from '../useApi';

// 成员数据类型 - 与API端点保持一致
export interface Member {
  country: string; // 国家编码
  areaCode: string;
  email: string;
  mobile?: string;
  password: string;
  invitationCode?: string; // 邀请码
  code: string;
}

export interface CreateMemberData {
  country: string;
  areaCode: string;
  email: string;
  mobile?: string;
  password: string;
  invitationCode?: string; // 邀请码
  code: string;
}

export interface MembersResponse {
  message: string;
  data: Member[];
}

export interface MemberResponse {
  message: string;
  data: Member;
}

// 注册接口
export function useCreateMember() {
  return useApiPost<MemberResponse, CreateMemberData>('/members');
}
