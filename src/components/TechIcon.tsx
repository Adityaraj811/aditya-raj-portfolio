import React from 'react';
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Server,
  ShieldCheck,
  Terminal,
  GitBranch,
  Layers,
  Cpu,
  Layout,
  Network,
  FileCode2,
  Box,
  Workflow,
  Send,
} from 'lucide-react';
import type { SkillItem } from '../data/portfolioConfig';

interface TechIconProps {
  iconKey: SkillItem['iconKey'];
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ iconKey, className = 'w-5 h-5' }) => {
  switch (iconKey) {
    case 'java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    case 'spring':
    case 'springboot':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L19.5 6.3V17.7L12 22L4.5 17.7V6.3L12 2Z" />
          <path d="M12 8V13" />
          <path d="M9.5 10.5A3.5 3.5 0 1 0 14.5 10.5" />
        </svg>
      );
    case 'sql':
    case 'mysql':
    case 'room':
      return <Database className={className} />;
    case 'javascript':
      return <FileCode2 className={className} />;
    case 'api':
    case 'retrofit':
      return <Network className={className} />;
    case 'jdbc':
    case 'jpa':
      return <Server className={className} />;
    case 'hibernate':
      return <Box className={className} />;
    case 'security':
      return <ShieldCheck className={className} />;
    case 'html':
      return <Code2 className={className} />;
    case 'css':
      return <Layout className={className} />;
    case 'responsive':
      return <Globe className={className} />;
    case 'android':
      return <Smartphone className={className} />;
    case 'xml':
    case 'viewbinding':
      return <FileCode2 className={className} />;
    case 'mvvm':
    case 'viewmodel':
      return <Layers className={className} />;
    case 'livedata':
      return <Workflow className={className} />;
    case 'git':
    case 'github':
      return <GitBranch className={className} />;
    case 'vscode':
      return <Cpu className={className} />;
    case 'postman':
      return <Send className={className} />;
    case 'linux':
      return <Terminal className={className} />;
    default:
      return <Code2 className={className} />;
  }
};
