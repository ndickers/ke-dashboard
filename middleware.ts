import { withAuth } from "next-auth/middleware";

export default withAuth(
    (request) => {
        // your middleware logic (optional)
    },
    {
        callbacks: {
            authorized({ token }) {
                console.log("MIDDLEWARE TOKEN", token);

                if (!token) {
                    return false;
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};


