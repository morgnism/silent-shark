import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type SmallAvatarProps = {
  name: string;
  image_url?: string;
};

const pullCallBackName = (name: string): string => {
  const nameParts = name.split(' ');
  const [first, last] = nameParts;
  if (first && last) {
    return `${first[0]}${last[0]}`;
  }
  return first[0];
};

const SmallAvatar = ({ name, image_url }: SmallAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={image_url} />
      <AvatarFallback>{pullCallBackName(name)}</AvatarFallback>
    </Avatar>
  );
};

export default SmallAvatar;
