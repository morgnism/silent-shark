import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

type SectionHeaderProps = {
  heading: string;
  eyebrow: string;
  href?: string;
  linkMessage?: string;
};

const SectionHeader = ({
  heading,
  eyebrow,
  href,
  linkMessage,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-end justify-between px-3">
      <div>
        <span className="intro-label relative inline-block font-semibold uppercase">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-xl font-semibold">{heading}</h2>
      </div>
      {href && (
        <Link href={href}>
          <Button variant="link" className="h-0 w-full p-0">
            {linkMessage}
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Right arrow</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
