import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Bell,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  Users,
  Wallet,
  Receipt,
  PieChart,
  Smartphone,
  Sparkles,
  RotateCcw,
  Home,
  Play,
  Pause,
} from 'lucide-react';

export type KhataScreenKey = 'login' | 'home' | 'add-expense' | 'settlement' | 'report';

export interface KhataScreenMeta {
  key: KhataScreenKey;
  shortLabel: string;
  title: string;
  subtitle: string;
  description: string;
}

export const KHATA_SCREENS: KhataScreenMeta[] = [
  {
    key: 'login',
    shortLabel: 'Login',
    title: 'Login Screen',
    subtitle: 'Secure Account Access',
    description:
      'Material 3 authentication screen with KHATA brand logo, interactive password visibility toggle, and live sign-in transition to Home.',
  },
  {
    key: 'home',
    shortLabel: 'Home',
    title: 'Home Dashboard',
    subtitle: 'Household Overview',
    description:
      'Interactive household dashboard with live group switcher (Flat 204 / Hostel / Trip), Forest Green total expense card, and quick action navigation.',
  },
  {
    key: 'add-expense',
    shortLabel: 'Add Split',
    title: 'Add Expense & Split',
    subtitle: 'Smart Bill Splitter',
    description:
      'Live expense calculator with category presets, Equal vs Custom split mode toggle, per-member share breakdown, and instant save flow.',
  },
  {
    key: 'settlement',
    shortLabel: 'Settle',
    title: 'Settlement & Balances',
    subtitle: 'Member Receivables',
    description:
      'Interactive member-to-member settlement engine — click "Settle Up" on any member to settle their balance and update net receivables in real time.',
  },
  {
    key: 'report',
    shortLabel: 'Report',
    title: 'Monthly Report & PDF',
    subtitle: 'Analytics & Export',
    description:
      'Animated monthly category breakdown (Rent, Groceries, Utilities) with month switcher and one-tap PDF report export.',
  },
];

// Framer Motion Staggered Container & Item Variants mimicking native Android Material 3 motion
const screenContainerVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 22 : -22,
    scale: 0.97,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 340,
      damping: 28,
      mass: 0.75,
      when: 'beforeChildren',
      staggerChildren: 0.065,
      delayChildren: 0.02,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -18 : 18,
    scale: 0.97,
    transition: {
      duration: 0.16,
      ease: 'easeInOut',
    },
  }),
};

const screenItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 26,
    },
  },
};

interface ExpensePreset {
  title: string;
  category: string;
  amount: number;
  customShares: [number, number, number, number];
}

const EXPENSE_PRESETS: ExpensePreset[] = [
  {
    title: 'BigBasket Groceries & Dairy',
    category: 'Groceries',
    amount: 1600,
    customShares: [500, 450, 350, 300],
  },
  {
    title: 'State Board Electricity Bill',
    category: 'Utilities',
    amount: 2400,
    customShares: [700, 650, 550, 500],
  },
  {
    title: 'Airtel Xstream Fiber Wi-Fi',
    category: 'Internet',
    amount: 1000,
    customShares: [250, 250, 250, 250],
  },
];

const GROUPS = [
  { name: 'Flat 204', members: '4 Members', total: 35840, receive: 2450 },
  { name: 'Hostel Wing B', members: '3 Members', total: 18400, receive: 1620 },
  { name: 'Manali Trip', members: '5 Members', total: 42500, receive: 3800 },
];

interface KhataInteractiveAppState {
  showPassword: boolean;
  isLoggingIn: boolean;
  groupIndex: number;
  presetIndex: number;
  splitMode: 'equal' | 'custom';
  settledMembers: { rahul: boolean; aman: boolean };
  reportMonth: 'oct' | 'sep';
  toastMessage: string | null;
}

interface KhataPhoneScreenProps {
  screen: KhataScreenKey;
  direction: number;
  revealCycle: number;
  appState: KhataInteractiveAppState;
  setAppState: React.Dispatch<React.SetStateAction<KhataInteractiveAppState>>;
  onNavigate: (screen: KhataScreenKey, e?: React.MouseEvent, toast?: string) => void;
  triggerToast: (msg: string) => void;
}

export const KhataPhoneScreen: React.FC<KhataPhoneScreenProps> = ({
  screen,
  direction,
  revealCycle,
  appState,
  setAppState,
  onNavigate,
  triggerToast,
}) => {
  const stopAndRun = (e: React.MouseEvent, fn: () => void) => {
    e.stopPropagation();
    fn();
  };

  const activeGroup = GROUPS[appState.groupIndex];
  const activePreset = EXPENSE_PRESETS[appState.presetIndex];

  const rahulPending = !appState.settledMembers.rahul ? 1450 : 0;
  const amanPending = !appState.settledMembers.aman ? 1000 : 0;
  const netReceivable = rahulPending + amanPending;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none font-sans bg-[#F8FAFC] text-[#0F172A] touch-pan-y"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Clean Mobile Status Bar */}
      <div className="px-3.5 pt-2 pb-1 flex items-center justify-between text-[10px] font-mono text-[#64748B] shrink-0">
        <span>9:41</span>
        <span>5G · 100%</span>
      </div>

      {/* Main Screen Content with Framer Motion AnimatePresence & Staggered Entrance */}
      <div className="flex-1 relative overflow-hidden touch-pan-y" style={{ touchAction: 'pan-y' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${screen}-${revealCycle}`}
            custom={direction}
            variants={screenContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full flex flex-col justify-between px-3.5 pb-2 overflow-hidden touch-pan-y"
            style={{ touchAction: 'pan-y' }}
          >
            {screen === 'login' && (
              <>
                {/* Brand Logo */}
                <motion.div
                  variants={screenItemVariants}
                  className="flex flex-col items-center text-center mt-0.5"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-10 h-10 rounded-2xl bg-[#0F5132] flex items-center justify-center text-white shadow-md"
                  >
                    <Wallet className="w-5 h-5" />
                  </motion.div>
                  <span className="mt-1 font-display text-sm font-extrabold tracking-wider text-[#0F5132]">
                    KHATA
                  </span>
                </motion.div>

                {/* Welcome Copy */}
                <motion.div variants={screenItemVariants}>
                  <h4 className="text-xs font-bold text-[#0F172A]">Welcome Back</h4>
                  <p className="text-[10px] text-[#64748B]">Login to continue to Flat 204</p>
                </motion.div>

                {/* Interactive Inputs */}
                <motion.div variants={screenItemVariants} className="space-y-1.5">
                  <div className="rounded-lg border border-[#CBD5E1] bg-white px-2.5 py-1.5 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[8px] text-[#64748B] leading-none">Email or Phone</p>
                      <p className="text-[10px] font-semibold text-[#0F172A] truncate mt-0.5">
                        aditya.raj@khata.app
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={(e) =>
                      stopAndRun(e, () =>
                        setAppState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
                      )
                    }
                    className="w-full rounded-lg border border-[#CBD5E1] hover:border-[#0F5132] bg-white px-2.5 py-1.5 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Lock className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                      <div className="text-left">
                        <p className="text-[8px] text-[#64748B] leading-none">Password</p>
                        <p className="text-[10px] font-bold text-[#0F172A] tracking-wider mt-0.5">
                          {appState.showPassword ? 'khata@2026' : '••••••••••'}
                        </p>
                      </div>
                    </div>
                    {appState.showPassword ? (
                      <EyeOff className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                    )}
                  </motion.button>
                </motion.div>

                {/* Login Button with Live Transition */}
                <motion.div variants={screenItemVariants} className="space-y-1.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={(e) =>
                      stopAndRun(e, () => {
                        setAppState((prev) => ({ ...prev, isLoggingIn: true }));
                        setTimeout(() => {
                          setAppState((prev) => ({ ...prev, isLoggingIn: false }));
                          onNavigate('home', undefined, 'Signed in as Aditya Raj');
                        }, 280);
                      })
                    }
                    className="w-full py-2 rounded-lg bg-[#0F5132] hover:bg-[#136F43] text-white text-[11px] font-semibold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{appState.isLoggingIn ? 'Signing in...' : 'Login to KHATA →'}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={(e) =>
                      stopAndRun(e, () =>
                        onNavigate('home', undefined, 'Guest preview opened: Flat 204')
                      )
                    }
                    className="w-full py-1 rounded-lg border border-[#0F5132]/40 text-[#0F5132] text-[10px] font-semibold text-center hover:bg-[#E8F5E9] transition-colors cursor-pointer"
                  >
                    Create New Account
                  </motion.button>
                </motion.div>
              </>
            )}

            {screen === 'home' && (
              <>
                {/* Greeting & Notification */}
                <motion.div
                  variants={screenItemVariants}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">Good Evening, Aditya</p>
                    <p className="text-[9px] text-[#64748B]">Split • Track • Settle</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={(e) =>
                      stopAndRun(e, () =>
                        triggerToast('2 pending settlements in ' + activeGroup.name)
                      )
                    }
                    className="w-6 h-6 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F5132] hover:bg-[#E8F5E9] cursor-pointer relative"
                  >
                    <Bell className="w-3 h-3" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                  </motion.button>
                </motion.div>

                {/* Interactive Group Switcher Card */}
                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={(e) =>
                    stopAndRun(e, () => {
                      const nextIdx = (appState.groupIndex + 1) % GROUPS.length;
                      setAppState((prev) => ({ ...prev, groupIndex: nextIdx }));
                      triggerToast(`Switched group to ${GROUPS[nextIdx].name}`);
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#0F5132]/40 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#E8F5E9] text-[#0F5132] flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[8px] text-[#64748B] leading-none">Current Group</p>
                      <p className="text-[10px] font-bold text-[#0F172A] mt-0.5">
                        {activeGroup.name}{' '}
                        <span className="font-normal text-[#64748B]">· {activeGroup.members}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0F5132]" />
                </motion.button>

                {/* Forest Green Hero Card */}
                <motion.div
                  variants={screenItemVariants}
                  className="p-2.5 rounded-xl bg-[#0F5132] text-white space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#E8F5E9]">Total Group Expense</span>
                    <span className="text-[8px] font-mono text-[#E8F5E9] px-1.5 py-0.5 rounded bg-[#136F43]">
                      Oct 2026
                    </span>
                  </div>
                  <p className="text-base font-extrabold tracking-tight leading-none tabular-nums">
                    ₹{activeGroup.total.toLocaleString('en-IN')}
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={(e) => onNavigate('settlement', e, 'Opened Settlement Balances')}
                    className="w-full px-2 py-1 rounded-lg bg-white text-[#0F172A] flex items-center justify-between hover:bg-[#F0FDF4] transition-colors cursor-pointer"
                  >
                    <span className="text-[9px] font-medium text-[#64748B]">You will receive</span>
                    <span className="text-[11px] font-bold text-[#16A34A] tabular-nums">
                      + ₹{netReceivable.toLocaleString('en-IN')} →
                    </span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={(e) => onNavigate('add-expense', e)}
                      className="py-1.5 px-2 rounded-lg bg-[#136F43] hover:bg-[#198754] text-white text-[9px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Expense</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={(e) => onNavigate('report', e)}
                      className="py-1.5 px-2 rounded-lg border border-[#E8F5E9]/60 hover:bg-white/10 text-[#E8F5E9] text-[9px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3 h-3" />
                      <span>PDF Report</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Recent Expense Item */}
                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={(e) => onNavigate('add-expense', e, 'Inspecting split breakdown')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] flex items-center justify-between text-[10px] transition-colors cursor-pointer"
                >
                  <div className="text-left">
                    <p className="font-semibold text-[#0F172A]">Flat Monthly Rent</p>
                    <p className="text-[8px] text-[#64748B]">Paid by Aditya · Split 4</p>
                  </div>
                  <span className="font-bold text-[#0F5132] tabular-nums">₹24,000</span>
                </motion.button>
              </>
            )}

            {screen === 'add-expense' && (
              <>
                {/* Header with Working Back Button */}
                <motion.div
                  variants={screenItemVariants}
                  className="flex items-center justify-between border-b border-[#EEF2F6] pb-1"
                >
                  <button
                    type="button"
                    onClick={(e) => onNavigate('home', e)}
                    className="p-0.5 rounded hover:bg-slate-200 text-[#0F172A] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#0F172A]">Add Expense</span>
                  <span className="text-[9px] text-[#0F5132] font-semibold">
                    {activeGroup.name}
                  </span>
                </motion.div>

                {/* Interactive Expense Preset Cycler */}
                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={(e) =>
                    stopAndRun(e, () => {
                      const nextPreset = (appState.presetIndex + 1) % EXPENSE_PRESETS.length;
                      setAppState((prev) => ({ ...prev, presetIndex: nextPreset }));
                      triggerToast(`Loaded ${EXPENSE_PRESETS[nextPreset].title}`);
                    })
                  }
                  className="w-full p-2 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#0F5132]/25 text-center transition-colors cursor-pointer"
                >
                  <p className="text-[8px] uppercase font-mono text-[#0F5132]">Expense Amount</p>
                  <p className="text-base font-extrabold text-[#0F5132] tabular-nums">
                    ₹{activePreset.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[9px] text-[#64748B] truncate">{activePreset.title}</p>
                </motion.button>

                {/* Category & Interactive Equal/Custom Split Mode Toggle */}
                <motion.div
                  variants={screenItemVariants}
                  className="grid grid-cols-2 gap-1.5 text-[9px]"
                >
                  <div className="p-1.5 rounded-lg bg-white border border-[#E2E8F0]">
                    <p className="text-[8px] text-[#64748B]">Category</p>
                    <p className="font-semibold text-[#0F172A]">{activePreset.category}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={(e) =>
                      stopAndRun(e, () => {
                        const nextMode = appState.splitMode === 'equal' ? 'custom' : 'equal';
                        setAppState((prev) => ({ ...prev, splitMode: nextMode }));
                        triggerToast(
                          nextMode === 'equal'
                            ? 'Switched to Equal 4-way split'
                            : 'Switched to Custom member split'
                        );
                      })
                    }
                    className="p-1.5 rounded-lg bg-[#E8F5E9] hover:bg-[#DCFCE7] border border-[#0F5132]/30 text-left transition-colors cursor-pointer"
                  >
                    <p className="text-[8px] text-[#0F5132]">Split Mode</p>
                    <p className="font-bold text-[#0F5132]">
                      {appState.splitMode === 'equal' ? 'Equal (4x)' : 'Custom Split'}
                    </p>
                  </motion.button>
                </motion.div>

                {/* Staggered Member Split Rows */}
                <motion.div variants={screenItemVariants} className="space-y-1 text-[9px]">
                  {['Aditya (You)', 'Rahul Sharma', 'Aman Verma', 'Rohit Singh'].map(
                    (member, idx) => {
                      const share =
                        appState.splitMode === 'equal'
                          ? Math.round(activePreset.amount / 4)
                          : activePreset.customShares[idx];
                      return (
                        <motion.div
                          key={member}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + idx * 0.045 }}
                          className="px-2 py-1 rounded bg-white border border-[#E2E8F0] flex items-center justify-between"
                        >
                          <span className="text-[#0F172A] font-medium truncate">{member}</span>
                          <span className="font-mono font-bold text-[#0F5132] tabular-nums">
                            ₹{share}
                          </span>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>

                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={(e) =>
                    onNavigate(
                      'settlement',
                      e,
                      `Saved ₹${activePreset.amount} (${appState.splitMode.toUpperCase()} split)`
                    )
                  }
                  className="w-full py-1.5 rounded-lg bg-[#0F5132] hover:bg-[#136F43] text-white text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Save &amp; Split Expense →
                </motion.button>
              </>
            )}

            {screen === 'settlement' && (
              <>
                <motion.div
                  variants={screenItemVariants}
                  className="flex items-center justify-between border-b border-[#E2E8F0] pb-1"
                >
                  <button
                    type="button"
                    onClick={(e) => onNavigate('home', e)}
                    className="p-0.5 rounded hover:bg-slate-200 text-[#0F172A] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#0F172A]">Settlement</span>
                  {appState.settledMembers.rahul || appState.settledMembers.aman ? (
                    <button
                      type="button"
                      onClick={(e) =>
                        stopAndRun(e, () => {
                          setAppState((prev) => ({
                            ...prev,
                            settledMembers: { rahul: false, aman: false },
                          }));
                          triggerToast('Reset member balances');
                        })
                      }
                      className="text-[9px] text-[#0F5132] font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Reset
                    </button>
                  ) : (
                    <span className="text-[9px] text-[#16A34A] font-semibold">Synced</span>
                  )}
                </motion.div>

                {/* Hero Receivable Card */}
                <motion.div
                  variants={screenItemVariants}
                  className="p-2.5 rounded-xl bg-[#0F5132] text-white"
                >
                  <p className="text-[9px] text-[#E8F5E9]">Net Receivable Balance</p>
                  <p className="text-base font-extrabold tabular-nums mt-0.5">
                    {netReceivable > 0
                      ? `+ ₹${netReceivable.toLocaleString('en-IN')}`
                      : '₹0 (All Settled!)'}
                  </p>
                  <p className="text-[9px] text-[#E8F5E9]/90 mt-0.5">
                    {netReceivable > 0
                      ? 'Tap "Settle" below to record payment'
                      : 'All Flat 204 members are settled up'}
                  </p>
                </motion.div>

                {/* Interactive Member Settlement Cards */}
                <motion.div variants={screenItemVariants} className="space-y-1.5 text-[9px]">
                  {/* Rahul Card */}
                  <motion.div
                    layout
                    className="p-2 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-[#0F172A]">Rahul Sharma</p>
                      <p className="text-[8px] text-[#64748B]">Rent &amp; Groceries share</p>
                    </div>
                    {appState.settledMembers.rahul ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#16A34A]"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Settled
                      </motion.span>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        type="button"
                        onClick={(e) =>
                          stopAndRun(e, () => {
                            setAppState((prev) => ({
                              ...prev,
                              settledMembers: { ...prev.settledMembers, rahul: true },
                            }));
                            triggerToast('Rahul ₹1,450 marked as Settled ✓');
                          })
                        }
                        className="px-2 py-1 rounded bg-[#E8F5E9] hover:bg-[#0F5132] text-[#0F5132] hover:text-white font-bold transition-colors cursor-pointer"
                      >
                        Settle ₹1,450
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Aman Card */}
                  <motion.div
                    layout
                    className="p-2 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-[#0F172A]">Aman Verma</p>
                      <p className="text-[8px] text-[#64748B]">Electricity &amp; Gas share</p>
                    </div>
                    {appState.settledMembers.aman ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#16A34A]"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Settled
                      </motion.span>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        type="button"
                        onClick={(e) =>
                          stopAndRun(e, () => {
                            setAppState((prev) => ({
                              ...prev,
                              settledMembers: { ...prev.settledMembers, aman: true },
                            }));
                            triggerToast('Aman ₹1,000 marked as Settled ✓');
                          })
                        }
                        className="px-2 py-1 rounded bg-[#E8F5E9] hover:bg-[#0F5132] text-[#0F5132] hover:text-white font-bold transition-colors cursor-pointer"
                      >
                        Settle ₹1,000
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Rohit Settled */}
                  <div className="px-2 py-1 rounded-lg bg-[#F0FDF4] border border-[#16A34A]/30 flex items-center justify-between">
                    <span className="font-medium text-[#0F5132]">Rohit Singh</span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#16A34A]">
                      <CheckCircle2 className="w-3 h-3" />
                      Settled
                    </span>
                  </div>
                </motion.div>
              </>
            )}

            {screen === 'report' && (
              <>
                <motion.div
                  variants={screenItemVariants}
                  className="flex items-center justify-between border-b border-[#E2E8F0] pb-1"
                >
                  <button
                    type="button"
                    onClick={(e) => onNavigate('home', e)}
                    className="p-0.5 rounded hover:bg-slate-200 text-[#0F172A] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#0F172A]">Monthly Report</span>
                  <PieChart className="w-3.5 h-3.5 text-[#0F5132]" />
                </motion.div>

                {/* Interactive Month Switcher */}
                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={(e) =>
                    stopAndRun(e, () => {
                      const nextM = appState.reportMonth === 'oct' ? 'sep' : 'oct';
                      setAppState((prev) => ({ ...prev, reportMonth: nextM }));
                      triggerToast(
                        nextM === 'oct'
                          ? 'Viewing October 2026 Report'
                          : 'Viewing September 2026 Report'
                      );
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="text-left">
                    <p className="text-[8px] text-[#64748B]">Selected Month</p>
                    <p className="text-[11px] font-bold text-[#0F172A]">
                      {appState.reportMonth === 'oct' ? 'October 2026' : 'September 2026'} ·{' '}
                      {activeGroup.name}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-[#0F5132] tabular-nums">
                    {appState.reportMonth === 'oct' ? '₹35,840' : '₹31,200'}
                  </span>
                </motion.button>

                {/* Animated Category Bars */}
                <motion.div variants={screenItemVariants} className="space-y-1.5 text-[9px]">
                  {(appState.reportMonth === 'oct'
                    ? [
                        {
                          label: 'House Rent',
                          amount: '₹24,000',
                          pct: '67%',
                          w: '67%',
                          color: '#0F5132',
                        },
                        {
                          label: 'Groceries & Kitchen',
                          amount: '₹6,840',
                          pct: '19%',
                          w: '26%',
                          color: '#198754',
                        },
                        {
                          label: 'Electricity & Wi-Fi',
                          amount: '₹5,000',
                          pct: '14%',
                          w: '18%',
                          color: '#2563EB',
                        },
                      ]
                    : [
                        {
                          label: 'House Rent',
                          amount: '₹24,000',
                          pct: '77%',
                          w: '77%',
                          color: '#0F5132',
                        },
                        {
                          label: 'Groceries & Kitchen',
                          amount: '₹4,500',
                          pct: '14%',
                          w: '19%',
                          color: '#198754',
                        },
                        {
                          label: 'Electricity & Wi-Fi',
                          amount: '₹2,700',
                          pct: '9%',
                          w: '12%',
                          color: '#2563EB',
                        },
                      ]
                  ).map((cat, idx) => (
                    <motion.div
                      key={cat.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.055 }}
                      className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#0F172A]">{cat.label}</span>
                        <span className="font-mono font-bold text-[#0F172A] tabular-nums">
                          {cat.amount} ({cat.pct})
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: cat.w }}
                          transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.15 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  variants={screenItemVariants}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={(e) =>
                    stopAndRun(e, () =>
                      triggerToast('Exported KHATA_Monthly_Report.pdf to Downloads!')
                    )
                  }
                  className="w-full py-1.5 rounded-lg bg-[#0F5132] hover:bg-[#136F43] text-white text-[10px] font-semibold text-center transition-colors cursor-pointer"
                >
                  Export Monthly Report (PDF)
                </motion.button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live In-App Android Toast Notification Overlay */}
      <AnimatePresence>
        {appState.toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute bottom-9 inset-x-3 z-30 pointer-events-none flex justify-center"
          >
            <div className="px-2.5 py-1 rounded-full bg-[#0F172A]/95 text-white text-[9px] font-mono shadow-lg border border-emerald-500/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="truncate">{appState.toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Android Bottom Navigation Bar inside Phone */}
      <div className="px-2 py-1 bg-white border-t border-[#E2E8F0] grid grid-cols-5 gap-0.5 text-[8px] font-semibold shrink-0">
        {[
          { key: 'login' as KhataScreenKey, label: 'Auth', icon: Lock },
          { key: 'home' as KhataScreenKey, label: 'Home', icon: Home },
          { key: 'add-expense' as KhataScreenKey, label: 'Add', icon: Plus },
          { key: 'settlement' as KhataScreenKey, label: 'Settle', icon: Wallet },
          { key: 'report' as KhataScreenKey, label: 'Report', icon: PieChart },
        ].map((nav) => {
          const Icon = nav.icon;
          const isCurrent = screen === nav.key;
          return (
            <button
              key={nav.key}
              type="button"
              onClick={(e) => onNavigate(nav.key, e)}
              className={`py-1 rounded flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isCurrent
                  ? 'text-[#0F5132] bg-[#E8F5E9]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="mt-0.5 leading-none">{nav.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface KhataScreenShowcaseProps {
  variant?: 'card' | 'modal';
}

interface PointerSwipeState {
  pointerId: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isHorizontalSwipe: boolean;
  isVerticalScroll: boolean;
}

const SWIPE_DISTANCE_THRESHOLD_PX = 36;
const SWIPE_DIRECTION_RATIO = 1.3;
const AUTO_TOUR_STEP_MS = 2600;
const AUTO_TOUR_IDLE_RESUME_MS = 4500;

export const KhataScreenShowcase: React.FC<KhataScreenShowcaseProps> = ({
  variant = 'card',
}) => {
  const [activeScreen, setActiveScreen] = useState<KhataScreenKey>('home');
  const [direction, setDirection] = useState<number>(1);
  const [revealCycle, setRevealCycle] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isTouchPaused, setIsTouchPaused] = useState<boolean>(false);

  // Direct DOM refs for 60fps 3D tilt & swipe feedback without React re-renders
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerSwipeRef = useRef<PointerSwipeState | null>(null);
  const suppressNextClickRef = useRef<boolean>(false);
  const idleResumeTimerRef = useRef<number | null>(null);

  const [appState, setAppState] = useState<KhataInteractiveAppState>({
    showPassword: false,
    isLoggingIn: false,
    groupIndex: 0,
    presetIndex: 0,
    splitMode: 'equal',
    settledMembers: { rahul: false, aman: false },
    reportMonth: 'oct',
    toastMessage: null,
  });

  const toastTimerRef = useRef<number | null>(null);

  const pauseAutoTourAndScheduleResume = () => {
    setIsTouchPaused(true);
    if (idleResumeTimerRef.current !== null) {
      window.clearTimeout(idleResumeTimerRef.current);
    }
    idleResumeTimerRef.current = window.setTimeout(() => {
      setIsTouchPaused(false);
      setAutoPlay(true);
      idleResumeTimerRef.current = null;
    }, AUTO_TOUR_IDLE_RESUME_MS);
  };

  useEffect(() => {
    return () => {
      if (idleResumeTimerRef.current !== null) {
        window.clearTimeout(idleResumeTimerRef.current);
      }
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleInteractionCapture = (
    e: React.SyntheticEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('[data-auto-tour-toggle="true"]')) {
      return;
    }
    pauseAutoTourAndScheduleResume();
  };

  const handleToggleAutoTour = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const isCurrentlyRunning = autoPlay && !isTouchPaused;
    if (isCurrentlyRunning) {
      setAutoPlay(false);
      pauseAutoTourAndScheduleResume();
    } else {
      if (idleResumeTimerRef.current !== null) {
        window.clearTimeout(idleResumeTimerRef.current);
        idleResumeTimerRef.current = null;
      }
      setIsTouchPaused(false);
      setAutoPlay(true);
    }
  };

  const handleSetAppState: React.Dispatch<React.SetStateAction<KhataInteractiveAppState>> = (
    updater
  ) => {
    pauseAutoTourAndScheduleResume();
    setAppState(updater);
  };

  const triggerToast = (msg: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setAppState((prev) => ({ ...prev, toastMessage: msg }));
    toastTimerRef.current = window.setTimeout(() => {
      setAppState((prev) => ({ ...prev, toastMessage: null }));
    }, 2200);
  };

  // Trigger staggered entrance animation when the KHATA card scrolls into view on mobile/tablet
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    let wasIntersecting = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !wasIntersecting) {
            wasIntersecting = true;
            setRevealCycle((c) => c + 1);
          } else if (!entry.isIntersecting) {
            wasIntersecting = false;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isAutoTourRunning = autoPlay && !isTouchPaused;

  useEffect(() => {
    if (!isAutoTourRunning) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setActiveScreen((prev) => {
        const idx = KHATA_SCREENS.findIndex((s) => s.key === prev);
        return KHATA_SCREENS[(idx + 1) % KHATA_SCREENS.length].key;
      });
    }, AUTO_TOUR_STEP_MS);
    return () => window.clearInterval(id);
  }, [isAutoTourRunning]);

  const currentIdx = KHATA_SCREENS.findIndex((s) => s.key === activeScreen);
  const currentMeta = KHATA_SCREENS[currentIdx] || KHATA_SCREENS[0];

  const handleNavigate = (
    key: KhataScreenKey,
    e?: React.MouseEvent,
    toast?: string
  ) => {
    if (e) e.stopPropagation();
    pauseAutoTourAndScheduleResume();
    const targetIdx = KHATA_SCREENS.findIndex((s) => s.key === key);
    setDirection(targetIdx >= currentIdx ? 1 : -1);
    setActiveScreen(key);
    if (toast) {
      triggerToast(toast);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    pauseAutoTourAndScheduleResume();
    setDirection(-1);
    const prevIdx = (currentIdx - 1 + KHATA_SCREENS.length) % KHATA_SCREENS.length;
    setActiveScreen(KHATA_SCREENS[prevIdx].key);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    pauseAutoTourAndScheduleResume();
    setDirection(1);
    const nextIdx = (currentIdx + 1) % KHATA_SCREENS.length;
    setActiveScreen(KHATA_SCREENS[nextIdx].key);
  };

  const applyPhoneTiltDOM = (
    rect: DOMRect,
    clientX: number,
    clientY: number,
    dragOffsetX = 0
  ) => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = window.requestAnimationFrame(() => {
      if (!phoneFrameRef.current || !rect.width || !rect.height) return;
      const px = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const ry = (px - 0.5) * 20;
      const rx = (0.5 - py) * 14;
      const clampedShiftX = Math.max(-18, Math.min(18, dragOffsetX * 0.18));
      phoneFrameRef.current.style.transform = `translate3d(${clampedShiftX.toFixed(
        1
      )}px, 0, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(
          1
        )}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.22), transparent 55%)`;
      }
    });
  };

  const resetPhoneTiltDOM = () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (phoneFrameRef.current) {
      phoneFrameRef.current.style.transform = 'translate3d(0, 0, 0) rotateX(4deg) rotateY(-8deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.background =
        'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.22), transparent 55%)';
    }
  };

  // Library-agnostic W3C Pointer Events touch-to-swipe & 3D tilt gesture handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    suppressNextClickRef.current = false;
    pointerSwipeRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isHorizontalSwipe: false,
      isVerticalScroll: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Hovering with a mouse without pressing buttons -> apply 3D tilt only
    if (e.pointerType === 'mouse' && e.buttons === 0) {
      applyPhoneTiltDOM(rect, e.clientX, e.clientY, 0);
      return;
    }

    const state = pointerSwipeRef.current;
    if (!state || state.pointerId !== e.pointerId) return;

    state.currentX = e.clientX;
    state.currentY = e.clientY;
    const dx = state.currentX - state.startX;
    const dy = state.currentY - state.startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // If vertical movement dominates, lock as vertical scroll so browser pan-y handles it natively
    if (!state.isHorizontalSwipe && absDy > 8 && absDy >= absDx) {
      state.isVerticalScroll = true;
      resetPhoneTiltDOM();
      return;
    }

    // If horizontal movement dominates, lock as horizontal swipe & provide live 3D drag feedback
    if (!state.isVerticalScroll && absDx > 10 && absDx > absDy * SWIPE_DIRECTION_RATIO) {
      state.isHorizontalSwipe = true;
      applyPhoneTiltDOM(rect, e.clientX, e.clientY, dx);
    }
  };

  const finalizePointerSwipe = (e: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const state = pointerSwipeRef.current;
    if (state && state.pointerId === e.pointerId && !cancelled && !state.isVerticalScroll) {
      const dx = (e.clientX || state.currentX) - state.startX;
      const dy = (e.clientY || state.currentY) - state.startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (
        (state.isHorizontalSwipe || absDx >= SWIPE_DISTANCE_THRESHOLD_PX) &&
        absDx >= SWIPE_DISTANCE_THRESHOLD_PX &&
        absDx > absDy * SWIPE_DIRECTION_RATIO
      ) {
        suppressNextClickRef.current = true;
        if (dx < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }

    pointerSwipeRef.current = null;
    resetPhoneTiltDOM();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finalizePointerSwipe(e, false);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    finalizePointerSwipe(e, true);
  };

  const handlePointerLeave = () => {
    if (!pointerSwipeRef.current) {
      resetPhoneTiltDOM();
    }
  };

  // Prevent accidental modal open when a user swipes horizontally on the KHATA card on mobile
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (suppressNextClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
      suppressNextClickRef.current = false;
    }
  };

  if (variant === 'modal') {
    return (
      <div
        ref={containerRef}
        className="bg-zinc-950 text-zinc-100 p-5 sm:p-7 space-y-6 select-none touch-pan-y"
        style={{ touchAction: 'pan-y' }}
        onPointerDownCapture={handleInteractionCapture}
        onTouchStartCapture={handleInteractionCapture}
        onKeyDownCapture={handleInteractionCapture}
      >
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F5132] border border-emerald-500/40 flex items-center justify-center text-white">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display text-sm sm:text-base font-bold text-white">
                  KHATA 3D Interactive App Preview
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {currentMeta.title} · {currentMeta.subtitle}
              </p>
            </div>
          </div>

          {/* 5 Screen Selector Tabs + Auto-Tour */}
          <div className="flex flex-wrap items-center gap-1.5">
            {KHATA_SCREENS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={(e) => handleNavigate(item.key, e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeScreen === item.key
                    ? 'bg-[#0F5132] text-white border border-emerald-400/50 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {item.shortLabel}
              </button>
            ))}
            <button
              type="button"
              data-auto-tour-toggle="true"
              onClick={handleToggleAutoTour}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 border cursor-pointer transition-colors ${
                isAutoTourRunning
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white'
              }`}
            >
              {isAutoTourRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoTourRunning ? 'Auto Tour: ON' : 'Paused · Tap to Tour'}</span>
            </button>
          </div>
        </div>

        {/* Main 3D Interactive Phone + All Screens Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 3D Perspective Phone Frame */}
          <div
            className="lg:col-span-5 flex flex-col items-center py-2 touch-pan-y"
            style={{ perspective: '1100px', touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerLeave}
            onClickCapture={handleClickCapture}
          >
            <div
              ref={phoneFrameRef}
              className="w-[275px] h-[390px] rounded-[30px] p-2.5 bg-zinc-900 border-2 border-zinc-700 shadow-[0_25px_60px_-15px_rgba(15,81,50,0.55)] relative transition-transform duration-200 ease-out touch-pan-y"
              style={{
                transform: 'translate3d(0, 0, 0) rotateX(4deg) rotateY(-8deg)',
                transformStyle: 'preserve-3d',
                touchAction: 'pan-y',
              }}
            >
              {/* Specular Glare Overlay */}
              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 rounded-[28px] z-20 opacity-35"
                style={{
                  background:
                    'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.22), transparent 55%)',
                }}
              />
              <div className="w-16 h-1 rounded-full bg-zinc-700 mx-auto mb-1.5" />
              <div className="w-full h-[356px] rounded-[22px] overflow-hidden border border-zinc-800 relative z-10 touch-pan-y">
                <KhataPhoneScreen
                  screen={activeScreen}
                  direction={direction}
                  revealCycle={revealCycle}
                  appState={appState}
                  setAppState={handleSetAppState}
                  onNavigate={handleNavigate}
                  triggerToast={triggerToast}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Screen Details & All 5 Screens Selector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{currentMeta.subtitle}</span>
                <span className="text-zinc-400">Android · Material 3</span>
              </div>
              <h5 className="font-display text-lg font-bold text-white">{currentMeta.title}</h5>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentMeta.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {KHATA_SCREENS.map((item, idx) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={(e) => handleNavigate(item.key, e)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeScreen === item.key
                      ? 'bg-[#0F5132]/25 border-emerald-500/60 text-white translate-x-0.5'
                      : 'bg-zinc-900/60 border-zinc-800/90 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400">
                      0{idx + 1}. {item.shortLabel}
                    </span>
                    <span className="truncate ml-2 text-zinc-500">{item.subtitle}</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-100 mt-1">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Card Variant on Homepage Featured Projects
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[410px] bg-zinc-950 text-zinc-100 p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none touch-pan-y"
      style={{ touchAction: 'pan-y' }}
      onPointerDownCapture={handleInteractionCapture}
      onTouchStartCapture={handleInteractionCapture}
      onKeyDownCapture={handleInteractionCapture}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      onClickCapture={handleClickCapture}
    >
      {/* Ambient Forest Green & Blue 3D Glow */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(15,81,50,0.5) 0%, rgba(16,185,129,0.16) 55%, transparent 100%)',
        }}
      />

      {/* Top Interactive Screen Switcher Bar */}
      <div className="relative z-10 space-y-2 border-b border-zinc-800/90 pb-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F5132] border border-emerald-500/40 flex items-center justify-center text-white shrink-0">
              <Receipt className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-mono font-semibold text-zinc-100 leading-tight">
                  KHATA · Expense Manager
                </p>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  {isAutoTourRunning ? 'Auto Tour' : 'Interactive'}
                </span>
              </div>
              <p className="text-[10px] text-emerald-400">{currentMeta.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              data-auto-tour-toggle="true"
              onClick={handleToggleAutoTour}
              aria-label={isAutoTourRunning ? 'Pause KHATA Auto Tour' : 'Start KHATA Auto Tour'}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 border cursor-pointer transition-colors ${
                isAutoTourRunning
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {isAutoTourRunning ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              <span>{isAutoTourRunning ? 'Touring' : 'Paused'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous KHATA screen"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next KHATA screen"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Screen Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {KHATA_SCREENS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={(e) => handleNavigate(item.key, e)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-all cursor-pointer ${
                activeScreen === item.key
                  ? 'bg-[#0F5132] text-white border border-emerald-400/50 shadow-xs scale-[1.03]'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Centered 3D Tilted Android Phone Frame with Live App Interaction */}
      <div
        className="relative z-10 my-2.5 flex justify-center items-center touch-pan-y"
        style={{ perspective: '1000px', touchAction: 'pan-y' }}
      >
        <div
          ref={phoneFrameRef}
          className="w-full max-w-[268px] h-[345px] rounded-[26px] p-2 bg-zinc-900 border-2 border-zinc-700/90 shadow-[0_20px_50px_-12px_rgba(15,81,50,0.5)] flex flex-col relative transition-transform duration-200 ease-out touch-pan-y"
          style={{
            transform: 'translate3d(0, 0, 0) rotateX(4deg) rotateY(-8deg)',
            transformStyle: 'preserve-3d',
            touchAction: 'pan-y',
          }}
        >
          {/* Dynamic Specular Light Reflection */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[24px] z-20 opacity-30"
            style={{
              background:
                'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.22), transparent 55%)',
            }}
          />
          <div className="w-14 h-1 rounded-full bg-zinc-700 mx-auto mb-1.5 shrink-0" />
          <div className="flex-1 w-full rounded-[18px] overflow-hidden border border-zinc-800 relative z-10 touch-pan-y">
            <KhataPhoneScreen
              screen={activeScreen}
              direction={direction}
              revealCycle={revealCycle}
              appState={appState}
              setAppState={handleSetAppState}
              onNavigate={handleNavigate}
              triggerToast={triggerToast}
            />
          </div>
        </div>
      </div>

      {/* Bottom Interactive Hint Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
        <span className="truncate">{currentMeta.title} · Swipe or Tap</span>
        <span className="text-emerald-400 shrink-0 ml-2">Full 5-Screen Gallery →</span>
      </div>
    </div>
  );
};
