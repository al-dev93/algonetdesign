import figmaIcon from '@iconify-icons/simple-icons/figma';
import githubIcon from '@iconify-icons/simple-icons/github';
import linkedinIcon from '@iconify-icons/simple-icons/linkedin';
import npmIcon from '@iconify-icons/simple-icons/npm';
import reactIcon from '@iconify-icons/simple-icons/react';
import {
  ArrowSquareOutIcon,
  CaretDoubleDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CodeIcon,
  CubeIcon,
  EarIcon,
  FileTextIcon,
  FlaskIcon,
  FolderOpenIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PaperPlaneTiltIcon,
  PencilSimpleIcon,
  PersonSimpleCircleIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StackIcon,
  StackPlusIcon,
  TargetIcon,
  TrendUpIcon,
  UsersThreeIcon,
  XIcon,
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

export const LOCAL_ICON_NAME = {
  CLOSE: 'close',
  EDIT: 'edit',
  FOLDER_OPEN: 'folderOpen',
  INFO: 'info',
  LAYERS: 'stack',
  NEXT_CHEVRON: 'next',
  PREV_CHEVRON: 'previous',
  QUICK_LINK_FOOTER: 'quickLinkFooter',
  VALIDATED: 'validated',
} as const;

export const LOCAL_PHOSPHOR_ICONS = {
  [LOCAL_ICON_NAME.QUICK_LINK_FOOTER]: CaretDoubleDownIcon,
  [LOCAL_ICON_NAME.PREV_CHEVRON]: CaretLeftIcon,
  [LOCAL_ICON_NAME.NEXT_CHEVRON]: CaretRightIcon,
  [LOCAL_ICON_NAME.VALIDATED]: CheckCircleIcon,
  [LOCAL_ICON_NAME.FOLDER_OPEN]: FolderOpenIcon,
  [LOCAL_ICON_NAME.INFO]: InfoIcon,
  [LOCAL_ICON_NAME.EDIT]: PencilSimpleIcon,
  [LOCAL_ICON_NAME.LAYERS]: StackIcon,
  [LOCAL_ICON_NAME.CLOSE]: XIcon,
} as const satisfies Record<string, ComponentType<IconProps>>;

export const PHOSPHOR_ICONS = {
  agility: RocketLaunchIcon,
  accessibility: PersonSimpleCircleIcon,
  code: CodeIcon,
  curiosity: MagnifyingGlassIcon,
  creativity: SparkleIcon,
  document: FileTextIcon,
  documentation: FileTextIcon,
  externalLink: ArrowSquareOutIcon,
  listening: EarIcon,
  modernize: CubeIcon,
  optimize: TrendUpIcon,
  problemSolving: TargetIcon,
  projectManagement: UsersThreeIcon,
  send: PaperPlaneTiltIcon,
  stabilize: ShieldCheckIcon,
  stack: StackPlusIcon,
  success: CheckCircleIcon,
  tests: FlaskIcon,
} as const satisfies Record<string, ComponentType<IconProps>>;

export const ICONIFY_ICONS = {
  figma: figmaIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
  npm: npmIcon,
  react: reactIcon,
  typescript: 'vscode-icons:file-type-typescript',
  code_github: 'octicon:file-code-24',
} as const;

export const APP_ICONS = { ...ICONIFY_ICONS, ...PHOSPHOR_ICONS };
