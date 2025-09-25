import {Angry, Heart} from "lucide-react";
import * as React from "react";

export const ReactionIcons: Record<number, React.ReactNode> = {
    1: <Heart className="w-full h-full"/>,
    2: <Angry className="w-full h-full"/>,
};