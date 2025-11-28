    import React from 'react';
    import ReactMarkdown from "react-markdown";

    import { KINAI_AVATAR_URL } from '../constants';

    interface KinaiAvatarProps {
      message?: string;
      size?: 'sm' | 'md' | 'lg';
      className?: string;
    }

    export const KinaiAvatar: React.FC<KinaiAvatarProps> = ({ message, size = 'md', className = '' }) => {
      const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-24 h-24',
        lg: 'w-48 h-48',
      };

      return (
        <div className={`flex items-center gap-4 ${className}`}>
          <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-brand-green shadow-lg flex-shrink-0 bg-white`}>
            <img src={KINAI_AVATAR_URL} alt="Kinai AI" className="w-full h-full object-cover" />
          </div>
          {message && (
            <div className="relative bg-white p-4 rounded-2xl shadow-md border border-brand-green/20 max-w-xs">
              <div className="absolute top-4 -left-2 w-4 h-4 bg-white border-l border-b border-brand-green/20 transform rotate-45"></div>
            <div className="text-sm text-gray-700 font-medium whitespace-pre-line">
  <ReactMarkdown>
    {message}
  </ReactMarkdown>
</div>


            </div>
          )}
        </div>
      );
    };
