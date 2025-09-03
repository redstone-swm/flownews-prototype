import { defineConfig } from "orval";

const STALENESS_5_MINUTES = 5 * 60 * 1000;
export default defineConfig({
    flownews: {
        output: {
            mode: "tags-split",
            target: "./src/api",
            schemas: "./src/api/models",
            client: "react-query",
            httpClient: "axios",
            override: {
                mutator: {
                    path: "./src/api/axiosInstance.tsx",
                    name: "axiosInstance"
                },
                query: {
                    useQuery: true,
                    useMutation: true,
                    signal: true,
                    options: {
                        staleTime: STALENESS_5_MINUTES,
                        refetchOnWindowFocus: false,
                    }
                },
                operations: {
                    getAllTopics: {
                        query: {
                            useQuery: true,
                            options: {
                                staleTime: STALENESS_5_MINUTES
                            }
                        }
                    },
                    getTopicDetails: {
                        query: {
                            useQuery: true,
                            options: {
                                staleTime: STALENESS_5_MINUTES
                            }
                        }
                    },
                    getCurrentUser: {
                        query: {
                            useQuery: true,
                            options: {
                                staleTime: STALENESS_5_MINUTES,
                                retry: false,
                            }
                        }
                    },
                    subscribeTopic: {
                        query: {
                            useMutation: true,
                        }
                    },
                    recordTopicHistory: {
                        query: {
                            useMutation: true,
                        }
                    },
                    appendEventLog: {
                        query: {
                            useMutation: true,
                        }
                    }
                }
            }
        },
        input: {
            target: "./openapi.yaml",
        },
    },
});