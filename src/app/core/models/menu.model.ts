export interface Menu {
  heading: string;
  icon: string;
  link?: string;
  outlet?: any;
  pages?: Menu[];
}

export interface Link {
  name: string;
  path: string;
}
