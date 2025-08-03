import { withAuth } from "next-auth/middleware";

export default withAuth(
    (request) => {
        // your middleware logic (optional)
    },
    {
        callbacks: {
            authorized({ token }) {
                return !!token; // only allow if token exists
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard"],
};


