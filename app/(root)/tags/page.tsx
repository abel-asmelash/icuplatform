import { getTags } from "@/lib/action/tag.action";

const Tags = async () => {
 
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
   
  });

  if (!success || !data) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const { tags } = data;
  console.log("TAGS", JSON.stringify(tags, null, 2));

  return (
    <div>Tags</div>  
  );
};

export default Tags;
