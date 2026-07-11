import { RouteParams } from "@/types/actions";
import { getUsers } from "@/lib/action/user.action";
import LocalSearch from "@/components/search/LocalSearch";
import DataRenderer from "@/components/DataRenderer";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/Pagination";
const CommunityPage = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: typeof query === "string" ? query : undefined,
   filter: typeof filter === "string" ? filter : undefined,
  });

  const { users, isNext } = data || {};

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          iconPosition="left"
          imgSrc="/public/assets/search.svg"
          placeholder="Search some great members of Icu"
          otherClasses="flex-1"
        />
      </div>
      <DataRenderer
        success={success}
        empty={EMPTY_USERS}
        error={error}
        data={users}
        render={(users) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users.map((user) => (
              <UserCard
                key={user._id}
                _id={user._id}
                name={user.name}
                username={user.username}
                image={user.image}
              />
            ))}
          </div>
        )}
      />
      <Pagination page={Number(page) || 1} isNext={isNext || false}/>
    </div>
  );
};

export default CommunityPage;
