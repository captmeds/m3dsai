import type { SchemaObject } from "@/lib/schema";

export default function JsonLd({ data }: { data: SchemaObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
