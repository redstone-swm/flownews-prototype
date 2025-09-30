export default interface User {
    id: number;
    email: string;
    name: string;
    profileUrl?: string;
    isProfileComplete: boolean;
}
