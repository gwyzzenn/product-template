import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Header, headerIcons, type HeaderProps } from "./Header";

/* ------------------------------------------------------------------ */
/* Shared data — mirrors the Figma "Header" documentation             */
/* ------------------------------------------------------------------ */

const nav = [
  { label: "Nav A", active: true },
  { label: "Nav B" },
  { label: "Nav C" },
];

const navWide = [
  { label: "Nav A", active: true },
  { label: "Nav B" },
  { label: "Nav C" },
  { label: "Nav D" },
  { label: "Nav E" },
];

/** 動作按鈕 — order: FAQ (User Manual) → Feedback → other actions. */
const actionButtons = [
  { label: "Button 1", icon: headerIcons.list, variant: "tertiary" as const },
  { label: "Button 2", icon: headerIcons.grid, variant: "tertiary" as const },
  { label: "Button", icon: headerIcons.plus, variant: "primary" as const },
];

/** 個人設定 — order: Language → Site → Color Theme. */
const settings = [
  { label: "Language", icon: headerIcons.globe, submenu: ["English", "繁體中文", "日本語"] },
  { label: "Site", icon: headerIcons.site, submenu: ["HQ", "Fab 12A", "Fab 14A"] },
  { label: "Color Theme", icon: headerIcons.theme, toggle: true },
];

const avatarMenuItems = [
  { label: "Select Item 1", icon: headerIcons.check },
  { label: "Select Item 2", icon: headerIcons.check },
];

const base: HeaderProps = {
  orgLabel: "HQ",
  showSearch: true,
  navItems: nav,
  actionButtons,
  settings,
  avatarMenuItems,
  showNotification: true,
  hasNotification: true,
};

/* ------------------------------------------------------------------ */
/* Meta                                                               */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Header> = {
  title: "Navigation/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    // Storybook Figma addon — jump straight to the source frame.
    design: {
      type: "figma",
      url: "https://www.figma.com/design/eSChwUP9CgaLUSGxCZq9kW/Training-material?node-id=1-3051",
    },
    docs: {
      description: {
        component:
          "Top navigation header. 動作按鈕 (action buttons) show inline by default and " +
          "collapse into the Avatar menu when (動作按鈕 + 個人設定) exceed the threshold " +
          "(default 6) or when items can't fit at 1280px. 個人設定 always live in the menu.",
      },
    },
  },
  argTypes: {
    collapse: { control: "inline-radio", options: ["auto", "always", "never"] },
    collapseThreshold: { control: { type: "number", min: 0, max: 12 } },
    theme: { control: "inline-radio", options: ["light", "dark"] },
    showSearch: { control: "boolean" },
    hasNotification: { control: "boolean" },
  },
  args: base,
};
export default meta;

type Story = StoryObj<typeof Header>;

/* ------------------------------------------------------------------ */
/* Stories                                                            */
/* ------------------------------------------------------------------ */

/** Default — action buttons inline, settings folded into the Avatar menu. */
export const Default: Story = {};

/** Avatar menu opened on mount, so the dropdown is visible in the snapshot. */
export const AvatarMenuOpen: Story = {
  args: { defaultMenuOpen: true },
};

/** 情境 1 — 動作按鈕 + 個人設定 > 6 → action buttons collapse into the menu. */
export const CollapsedByCount: Story = {
  name: "Collapsed · 情境 1 (>6)",
  args: { collapse: "always", defaultMenuOpen: true },
};

/** 情境 2 — 1280px can't fit everything: wider nav, search yields, buttons collapse. */
export const NarrowCollapsed: Story = {
  name: "Collapsed · 情境 2 (1280)",
  args: {
    collapse: "always",
    navItems: navWide,
    showSearch: false,
    defaultMenuOpen: true,
  },
  parameters: { viewport: { defaultViewport: "responsive" } },
};

/** Minimal — logo, nav and avatar only. */
export const Minimal: Story = {
  args: {
    showSearch: false,
    orgLabel: undefined,
    actionButtons: [],
    settings: [],
    avatarMenuItems: [],
    hasNotification: false,
  },
};

/** Dark mode — theme toggle wired through React state. */
export const DarkMode: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    return (
      <div data-theme={theme} style={{ background: "var(--color-surface)" }}>
        <Header
          {...args}
          theme={theme}
          onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        />
      </div>
    );
  },
  args: { defaultMenuOpen: true },
};
