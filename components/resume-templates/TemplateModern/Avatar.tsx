interface AvatarProps {
    src?: string;
    alt?: string;
}

export const Avatar = ({ src, alt = "Profile photo" }: AvatarProps) => {
    if (!src) return null;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            className="w-full h-[220px] object-cover grayscale"
        />
    );
};