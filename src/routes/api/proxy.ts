import { createFileRoute } from "@tanstack/react-router";
import { APPS_SCRIPT_URL } from "@/lib/site";

export const Route = createFileRoute("/api/proxy")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!APPS_SCRIPT_URL) {
          return new Response(
            JSON.stringify({ ok: false, error: "Apps Script URL not configured" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          const url = new URL(request.url);
          const searchParams = url.searchParams.toString();
          const separator = APPS_SCRIPT_URL.includes("?") ? "&" : "?";
          const targetUrl = `${APPS_SCRIPT_URL}${searchParams ? `${separator}${searchParams}` : ""}`;

          const response = await fetch(targetUrl, {
            method: "GET",
            redirect: "follow",
          });

          const responseText = await response.text();

          return new Response(responseText, {
            status: response.status,
            headers: {
              "Content-Type": response.headers.get("content-type") || "application/json",
            },
          });
        } catch (error: any) {
          return new Response(
            JSON.stringify({ ok: false, error: error.message || "Request failed" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      POST: async ({ request }) => {
        if (!APPS_SCRIPT_URL) {
          return new Response(
            JSON.stringify({ ok: false, error: "Apps Script URL not configured" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          const contentType = request.headers.get("content-type") || "";
          
          let body: any;
          if (contentType.includes("multipart/form-data")) {
            body = await request.arrayBuffer();
          } else {
            body = await request.text();
          }

          const headers = new Headers();
          if (contentType) {
            headers.set("content-type", contentType);
          }

          const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers,
            body,
            redirect: "follow",
          });

          const responseText = await response.text();

          return new Response(responseText, {
            status: response.status,
            headers: {
              "Content-Type": response.headers.get("content-type") || "application/json",
            },
          });
        } catch (error: any) {
          return new Response(
            JSON.stringify({ ok: false, error: error.message || "Request failed" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
