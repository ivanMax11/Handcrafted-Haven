interface AvatarProps {
  imageUrl: string;
  className?: string; 
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, className, alt }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img 
        src={imageUrl}  
        alt={alt} 
        className="w-24 h-24 rounded-full border-2 border-gray-300" 
      />
    </div>
  );
};

export default Avatar;
