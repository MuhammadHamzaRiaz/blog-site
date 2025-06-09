import { redirect } from "next/navigation";

const page = () => {
  redirect("/admin/posts");
};

export default page;
