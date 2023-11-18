interface FileUpload {
  name: string;
  id: string;
  title: string;
  status: string;
}

interface User {
  user_id: string;
  role: string;
  email: string;
  is_aceepted_by_admin: boolean;
  firstname: string;
  lastname: string;
  from_admin_message: string;
}
