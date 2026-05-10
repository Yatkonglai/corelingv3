"use client";

import ReactMarkdown from 'react-markdown';
import { Message, Role, Translation } from '../lib/types';
import { Sparkles, Bot, User, Palette } from 'lucide-react';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
  translations: Translation;
  onGenerateImage: (text: string, schemeName?: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, translations, onGenerateImage }) => {
  const isUser = message.role === Role.USER;

  const schemeRegex = /(?:###\s*)?(?:Scheme|方案)\s*([A-Z0-9]+)/gi;
  const schemesFound = Array.from(message.text.matchAll(schemeRegex)).map(m => m[0].replace(/###\s*/, '').trim());
  const uniqueSchemes = [...new Set(schemesFound)];

  const canGenerate = !isUser && message.text.length > 50 && !message.isGenerating && !message.imageUrl;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>

        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-[#ff385c]' : 'bg-[#f7f7f7]'}`}>
          {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-[#ff385c]" />}
        </div>

        {/* Content Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full`}>
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden w-full
              ${isUser
                ? 'bg-[#ff385c] text-white rounded-tr-none'
                : 'bg-white border border-[#ebebeb] text-[#222222] rounded-tl-none'
              }`}
          >
            {/* Markdown Text */}
            <div className={`markdown-body ${isUser ? 'text-white' : 'text-[#222222]'}`}>
               <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-6 mb-3 text-[#ff385c] border-b border-[#ebebeb] pb-2" {...props} />,

                  strong: ({node, ...props}) => <strong className="font-bold text-[#222222]" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0 whitespace-pre-line" {...props} />,

                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-[#ebebeb] shadow-sm">
                      <table className="min-w-full text-left text-sm border-collapse" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-[#f7f7f7] text-[#222222] font-bold" {...props} />,
                  tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-[#ebebeb]" {...props} />,
                  tr: ({node, ...props}) => <tr className="hover:bg-[#f7f7f7] transition-colors" {...props} />,
                  th: ({node, ...props}) => <th className="p-3 border-r border-[#ebebeb] last:border-r-0 whitespace-nowrap" {...props} />,
                  td: ({node, ...props}) => <td className="p-3 border-r border-[#ebebeb] last:border-r-0 align-top leading-relaxed" {...props} />,
                }}
               >
                 {message.text}
               </ReactMarkdown>
            </div>

            {/* Generated Image */}
            {message.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-[#ebebeb] shadow-md relative group">
                <img src={message.imageUrl} alt="Generated Jewelry Design" className="w-full h-auto max-w-md object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">AI Generated Visualization</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons (Only for Model) */}
          {canGenerate && (
            <div className="mt-2 flex flex-wrap gap-2">
              {uniqueSchemes.length > 0 ? (
                uniqueSchemes.map((scheme) => (
                   <button
                    key={scheme}
                    onClick={() => onGenerateImage(message.text, scheme)}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f7f7f7] text-[#ff385c] rounded-full text-xs font-medium transition-all border border-[#ebebeb] shadow-sm hover:shadow-md hover:border-[#ff385c]"
                  >
                    <Palette size={14} />
                    {translations.generateImage} ({scheme})
                  </button>
                ))
              ) : (
                <button
                  onClick={() => onGenerateImage(message.text)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f7f7f7] hover:bg-[#ff385c] hover:text-white text-[#ff385c] rounded-full text-xs font-medium transition-colors border border-[#ebebeb]"
                >
                  <Sparkles size={14} />
                  {translations.generateImage}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
