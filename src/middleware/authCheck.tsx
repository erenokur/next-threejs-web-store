import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const authCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default authCheck;
