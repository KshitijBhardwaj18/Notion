"use client";

// जय श्री राम 

import { Doc, Id } from "@/convex/_generated/dataModel";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Item } from "./item";

import { cn } from "@/lib/utils";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 ",
          expanded && "last : block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
            <Item id={}/>
        </div>

      ))}
    </>
  );
};
