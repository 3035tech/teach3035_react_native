import { useEffect, useState } from "react";

import { DocumentData } from "firebase/firestore";

type UsePaginationProps<T> = {
    getDataFn: (
        lastDoc: DocumentData | null
    ) => Promise<{ data: T[]; lastDoc: DocumentData }>;
    getTotalElements: () => Promise<number>;
};

export const usePagination = <T>({
    getDataFn,
    getTotalElements,
}: UsePaginationProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingElementsCount, setIsLoadingElementsCount] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [nextCursorPointer, setNextCursorPointer] =
        useState<DocumentData | null>(null);

    const handleGetTotalElements = async () => {
        try {
            setIsLoadingElementsCount(true);
            const totalElements = await getTotalElements();
            setTotalElements(totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingElementsCount(false);
        }
    };

    const handleGetData = async () => {
        try {
            if (totalElements <= data.length) {
                return;
            }
            setIsLoading(true);

            const { data: retrievedData, lastDoc } = await getDataFn(
                nextCursorPointer
            );

            setNextCursorPointer(lastDoc);
            setData((prevData) => [...prevData, ...retrievedData]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateElement = (index: number, updatedData: Partial<T>) => {
        const newData = [...data];
        const element = newData[index];

        newData[index] = {
            ...element,
            ...updatedData,
        };

        setData(newData);
    };

    const fetchNextPageData = async () => {
        if (nextCursorPointer) handleGetData();
    };

    useEffect(() => {
        handleGetTotalElements();
    }, []);

    useEffect(() => {
        if (totalElements > 0) {
            handleGetData();
        }
    }, [totalElements]);

    return {
        isLoading,
        isLoadingElementsCount,
        data,
        fetchNextPageData,
        updateElement,
    };
};
