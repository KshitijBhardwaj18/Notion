"use client"

import { Doc, Id } from "@/convex/_generated/dataModel"

import { useParams, useRouter } from "next/navigation"

import { useState } from "react"

import {useQuery} from "convex/react";

import { api } from "@/convex/_generated/api";

import { Item } from "./item";

interface DocumentListProps{
    parentDocumentId?: Id<"documents">
    level?: number;
    data?: Doc<"documents">[];

}

export const DocumentList = ({
    parentDocumentId,
    level = 0
} : DocumentListProps) => {

    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    };

    const documents = useQuery(api.documents.getSidebar, {parentDocument : parentDocumentId});

    const onRedirect = (documentId: string ) => {
        router.push(`/documents/${documentId}`);
    };

    if (documents === undefined){
        return(
            <>
            <Item.Skeleton level={level}/>
            {level === 0 && (
                <>



                </>
            )}
            </>

        )

    }



    
}