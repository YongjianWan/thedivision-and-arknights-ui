// ==UserScript==
// @name         OpenClaw Gateway - Tactical UI Theme v2
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @description  全境封锁 + 明日方舟风格主题 - 基于 ui母版 login/dashboard 设计
// @author       Aiden
// @match        http://43.163.239.60:18789/*
// @match        http://localhost:18789/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ============================================
    // Design Tokens (from tokens.json)
    // ============================================
    const tokens = `
        :root {
            /* Background */
            --bg-base: #0B0E12;
            --bg-elevated: #101622;
            --bg-overlay: rgba(10, 14, 18, 0.75);
            --bg-base-rgb: 11, 14, 18;
            
            /* Text */
            --text-primary: #E6EDF3;
            --text-secondary: #9AA6B2;
            --text-disabled: #4A5568;
            
            /* Border */
            --border-strong: #3A4A5A;
            --border-strong-rgb: 58, 74, 90;
            --border-weak: rgba(42, 58, 70, 0.5);
            
            /* Accent - Division Orange */
            --accent: #FF6A00;
            --accent-hover: #FF7A1A;
            --accent-rgb: 255, 106, 0;
            
            /* Accent Alt - Arknights Cyan */
            --accent-alt: #18D1FF;
            --accent-alt-hover: #4ADCFF;
            --accent-alt-rgb: 24, 209, 255;
            
            /* State */
            --danger: #FF3B30;
            --danger-muted: #CC2F28;
            --success: #32D74B;
            --success-muted: #1A5C28;
            --warning: #B8860B;
            --warning-muted: #8B6914;
            
            /* Typography */
            --font-sans: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
            --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
            --font-display: 'DIN Alternate', 'Roboto Condensed', sans-serif;
            --font-hud: 'Orbitron', monospace;
            
            /* Spacing */
            --space-micro: 4px;
            --space-sm: 8px;
            --space-md: 16px;
            --space-lg: 24px;
            
            /* Radius */
            --radius-sm: 2px;
            --radius-md: 4px;
            
            /* Motion */
            --transition-fast: 0.2s;
            --transition-base: 0.3s;
        }
    `;

    // ============================================
    // Global & Reset Styles
    // ============================================
    const globalStyles = `
        /* Force dark theme */
        html, body {
            background-color: var(--bg-base) !important;
            color: var(--text-primary) !important;
        }
        
        /* Scrollbar - minimal tactical */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-base);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--border-strong);
            border-radius: 0;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--accent);
        }
        
        /* Selection - accent color */
        ::selection {
            background-color: var(--accent);
            color: white;
        }
    `;

    // ============================================
    // Atmospheric Effects (from login page)
    // ============================================
    const atmosphericStyles = `
        /* Scanline overlay - CRT effect */
        .scanline-overlay::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.03;
            background: 
                linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%),
                linear-gradient(90deg, rgba(var(--accent-rgb),0.06), rgba(var(--accent-rgb),0.02), rgba(var(--accent-rgb),0.06));
            background-size: 100% 2px, 3px 100%;
        }
        
        /* Noise overlay */
        .noise-overlay::after {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.03;
            mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
    `;

    // ============================================
    // Utility Classes (from globals.css)
    // ============================================
    const utilityStyles = `
        /* Focus ring */
        .focus-ring:focus,
        .focus-ring:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--accent), 0 0 0 4px rgba(var(--accent-rgb), 0.2);
        }
        
        /* Clip corners - Arknights signature */
        .clip-corner-tr {
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
        }
        .clip-corner-br {
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
        }
        .clip-corner-both {
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
        }
        
        /* Anchor points */
        .anchor {
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--border-strong);
            z-index: 10;
        }
        .anchor-tl { top: 4px; left: 4px; }
        .anchor-tr { top: 4px; right: 4px; }
        .anchor-bl { bottom: 4px; left: 4px; }
        .anchor-br { bottom: 4px; right: 4px; }
        .anchor-accent {
            background: var(--accent);
            box-shadow: 0 0 4px var(--accent);
        }
        
        /* Ghost text effect */
        .ghost-title {
            position: relative;
            isolation: isolate;
        }
        .ghost-title::before {
            content: attr(data-text);
            position: absolute;
            top: 2px;
            left: 0;
            color: #000;
            opacity: 0.25;
            filter: blur(2px);
            z-index: -2;
            pointer-events: none;
        }
        .ghost-title::after {
            content: attr(data-text);
            position: absolute;
            top: -1px;
            left: 1px;
            color: var(--accent);
            opacity: 0.08;
            filter: blur(4px);
            z-index: -1;
            pointer-events: none;
        }
        
        /* Glow effects */
        .glow-accent {
            text-shadow: 0 0 20px rgba(var(--accent-rgb), 0.6), 0 0 40px rgba(var(--accent-rgb), 0.3);
        }
        .glow-box-accent {
            box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.4);
        }
        
        /* Border glow pulse */
        @keyframes border-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(var(--accent-alt-rgb), 0.3), inset 0 0 0 1px rgba(var(--accent-alt-rgb), 0.1); }
            50% { box-shadow: 0 0 20px rgba(var(--accent-alt-rgb), 0.6), inset 0 0 0 1px rgba(var(--accent-alt-rgb), 0.2); }
        }
        .border-glow-pulse {
            animation: border-glow 2s ease-in-out infinite;
        }
        
        /* Backdrop blur */
        .backdrop-blur-panel {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        
        /* Status pulse */
        @keyframes status-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .status-pulse {
            animation: status-pulse 2s ease-in-out infinite;
        }
        
        /* HUD font */
        .font-hud {
            font-family: var(--font-hud), 'Orbitron', monospace;
            letter-spacing: 0.15em;
        }
        .font-display {
            font-family: var(--font-display);
            letter-spacing: 0.1em;
        }
    `;

    // ============================================
    // Tactical Panel Styles (L1/L2/L3 system)
    // ============================================
    const panelStyles = `
        /* Panel Base */
        .tactical-panel {
            position: relative;
            background: var(--bg-overlay);
            backdrop-filter: blur(12px);
        }
        
        /* L1 - Simple border */
        .tactical-panel-l1 {
            border: 1px solid var(--border-weak);
        }
        
        /* L2 - Double border with shadow */
        .tactical-panel-l2 {
            border: 2px solid var(--border-strong);
            box-shadow: inset 0 0 0 1px rgba(var(--border-strong-rgb), 0.3);
        }
        .tactical-panel-l2::before {
            content: '';
            position: absolute;
            inset: 2px;
            border: 1px solid var(--border-weak);
            pointer-events: none;
        }
        
        /* L3 - Accent border with glow */
        .tactical-panel-l3 {
            border: 2px solid var(--accent);
            box-shadow: 
                0 0 12px rgba(var(--accent-rgb), 0.15),
                inset 0 0 0 1px rgba(var(--accent-rgb), 0.2);
        }
        .tactical-panel-l3::before {
            content: '';
            position: absolute;
            inset: 2px;
            border: 1px solid rgba(var(--accent-rgb), 0.3);
            pointer-events: none;
        }
        
        /* Panel Title Bar */
        .panel-title-bar {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            margin-bottom: var(--space-sm);
        }
        .panel-title-bar::before {
            content: '';
            width: 4px;
            height: 16px;
            background: var(--accent);
        }
        .panel-title {
            font-family: var(--font-display);
            font-size: 12px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--text-secondary);
            font-style: italic;
        }
        .panel-title-line {
            flex: 1;
            height: 1px;
            background: var(--border-weak);
        }
    `;

    // ============================================
    // Gateway Control UI Specific Overrides
    // ============================================
    const gatewayOverrides = `
        /* === Main App Container === */
        openclaw-app,
        #root,
        [class*="App"],
        [data-reactroot] {
            background-color: var(--bg-base) !important;
        }
        
        /* === Layout Structure === */
        /* Sidebar - L2 Tactical Panel style */
        aside,
        [class*="sidebar"],
        [class*="Sidebar"],
        nav[class*="nav"],
        [class*="navigation"] {
            background: rgba(var(--bg-base-rgb), 0.95) !important;
            border-right: 2px solid var(--border-strong) !important;
            box-shadow: inset -1px 0 0 rgba(var(--border-strong-rgb), 0.3) !important;
        }
        
        /* Main content area */
        main,
        [class*="main"],
        [class*="content"] {
            background-color: var(--bg-base) !important;
        }
        
        /* === Status Bar (Top) === */
        header,
        [class*="header"],
        [class*="status-bar"],
        [class*="StatusBar"] {
            background: rgba(var(--bg-base-rgb), 0.9) !important;
            border-bottom: 1px solid var(--border-weak) !important;
            backdrop-filter: blur(12px) !important;
        }
        
        /* === Message/Chat List === */
        /* Message items - Card style */
        [class*="message"],
        [class*="Message"],
        [class*="conversation"],
        [class*="Conversation"],
        [class*="chat-item"],
        [class*="thread"] {
            background: var(--bg-overlay) !important;
            border: 1px solid var(--border-weak) !important;
            border-left: 2px solid transparent !important;
            transition: all var(--transition-fast) !important;
            position: relative !important;
        }
        
        [class*="message"]:hover,
        [class*="conversation"]:hover {
            border-color: var(--border-strong) !important;
            background: var(--bg-elevated) !important;
        }
        
        /* Active/Selected state - L3 style left border */
        [class*="message"][class*="active"],
        [class*="message"][class*="selected"],
        [class*="conversation"][class*="active"],
        [class*="conversation"][class*="selected"],
        [class*="active"] {
            border-left-color: var(--accent) !important;
            background: var(--bg-elevated) !important;
            box-shadow: inset 4px 0 0 var(--accent) !important;
        }
        
        /* === Input Area === */
        textarea,
        input[type="text"],
        [class*="input"],
        [class*="Input"],
        [class*="textarea"],
        [class*="compose"] {
            background-color: var(--bg-base) !important;
            border: 1px solid var(--border-weak) !important;
            border-radius: var(--radius-md) !important;
            color: var(--text-primary) !important;
            font-family: var(--font-mono) !important;
            transition: all var(--transition-fast) !important;
        }
        
        textarea:focus,
        input:focus,
        [class*="input"]:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.3) !important;
            outline: none !important;
        }
        
        /* === Buttons === */
        button,
        [role="button"],
        [class*="button"],
        [class*="Button"] {
            background: transparent !important;
            border: 1px solid var(--border-strong) !important;
            border-radius: 0 !important;
            color: var(--text-primary) !important;
            font-family: var(--font-sans) !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
            padding: 8px 16px !important;
            transition: all var(--transition-fast) !important;
            cursor: pointer !important;
        }
        
        button:hover,
        [class*="button"]:hover {
            border-color: var(--accent) !important;
            color: var(--accent) !important;
            box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.3) !important;
        }
        
        /* Primary button - Division orange */
        button[class*="primary"],
        button[type="submit"],
        [class*="primary"],
        [class*="send"] {
            background: var(--accent) !important;
            border-color: var(--accent) !important;
            color: var(--bg-base) !important;
        }
        
        button[class*="primary"]:hover,
        button[type="submit"]:hover {
            background: var(--accent-hover) !important;
            box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.5) !important;
        }
        
        /* Danger button */
        button[class*="danger"],
        button[class*="delete"],
        [class*="danger"] {
            background: var(--danger) !important;
            border-color: var(--danger) !important;
            color: white !important;
        }
        
        /* === Text Styles === */
        h1, h2, h3, h4, h5, h6 {
            color: var(--text-primary) !important;
            font-family: var(--font-display) !important;
            letter-spacing: 0.05em !important;
        }
        
        p, span, div {
            color: var(--text-secondary);
        }
        
        [class*="title"],
        [class*="name"],
        [class*="label"] {
            color: var(--text-primary) !important;
        }
        
        /* === Links === */
        a,
        [class*="link"] {
            color: var(--accent-alt) !important;
            transition: color var(--transition-fast) !important;
        }
        
        a:hover {
            color: var(--accent-alt-hover) !important;
        }
        
        /* === Cards & Panels === */
        [class*="card"],
        [class*="Card"],
        [class*="panel"],
        [class*="Panel"],
        [class*="container"] {
            background: var(--bg-overlay) !important;
            border: 1px solid var(--border-weak) !important;
        }
        
        /* === Modals & Drawers === */
        [class*="modal"],
        [class*="Modal"],
        [class*="drawer"],
        [class*="Drawer"],
        [class*="overlay"],
        [role="dialog"] {
            background: var(--bg-overlay) !important;
            backdrop-filter: blur(12px) !important;
            border: 1px solid var(--border-strong) !important;
        }
        
        /* === Tables === */
        table,
        [class*="table"] {
            background: transparent !important;
            border-collapse: collapse !important;
        }
        
        th,
        [class*="th"],
        [class*="header-cell"] {
            background: var(--bg-elevated) !important;
            border-bottom: 1px solid var(--border-strong) !important;
            color: var(--text-secondary) !important;
            font-family: var(--font-display) !important;
            font-size: 11px !important;
            letter-spacing: 0.1em !important;
            text-transform: uppercase !important;
            padding: 12px 16px !important;
        }
        
        td,
        [class*="td"],
        [class*="cell"] {
            border-bottom: 1px solid var(--border-weak) !important;
            padding: 12px 16px !important;
        }
        
        tr:hover,
        [class*="row"]:hover {
            background: var(--bg-elevated) !important;
        }
        
        /* === Code Blocks === */
        code,
        pre,
        [class*="code"] {
            font-family: var(--font-mono) !important;
            background: var(--bg-elevated) !important;
            color: var(--accent-alt) !important;
            border: 1px solid var(--border-weak) !important;
        }
        
        /* === Progress Bars === */
        progress,
        [class*="progress"],
        [class*="Progress"] {
            background: var(--bg-elevated) !important;
            border: none !important;
            height: 4px !important;
        }
        
        progress::-webkit-progress-bar,
        [class*="progress-bar"] {
            background: var(--bg-elevated) !important;
        }
        
        progress::-webkit-progress-value,
        [class*="progress-fill"] {
            background: var(--accent) !important;
        }
        
        /* === Tabs === */
        [class*="tab"],
        [role="tab"] {
            background: transparent !important;
            border: none !important;
            border-bottom: 2px solid transparent !important;
            color: var(--text-secondary) !important;
            font-family: var(--font-display) !important;
            font-size: 12px !important;
            letter-spacing: 0.1em !important;
            text-transform: uppercase !important;
            padding: 12px 16px !important;
            transition: all var(--transition-fast) !important;
        }
        
        [class*="tab"]:hover,
        [role="tab"]:hover {
            color: var(--text-primary) !important;
        }
        
        [class*="tab"][aria-selected="true"],
        [class*="active"][class*="tab"],
        [role="tab"][aria-selected="true"] {
            color: var(--accent) !important;
            border-bottom-color: var(--accent) !important;
        }
        
        /* === Dividers === */
        hr,
        [class*="divider"],
        [class*="Divider"] {
            border: none !important;
            border-top: 1px solid var(--border-weak) !important;
            margin: 16px 0 !important;
        }
        
        /* === Tooltips === */
        [class*="tooltip"],
        [class*="Tooltip"],
        [role="tooltip"] {
            background: var(--bg-elevated) !important;
            border: 1px solid var(--border-strong) !important;
            color: var(--text-primary) !important;
            font-family: var(--font-mono) !important;
            font-size: 11px !important;
        }
        
        /* === Avatar/Icons === */
        img,
        [class*="avatar"],
        [class*="Avatar"],
        [class*="icon"],
        svg {
            border-radius: 0 !important;
        }
    `;

    // ============================================
    // Animation Keyframes
    // ============================================
    const animationStyles = `
        /* Border scan animation */
        @keyframes border-scan-h {
            0% { left: -100%; }
            50%, 100% { left: 100%; }
        }
        @keyframes border-scan-v {
            0% { top: -100%; }
            50%, 100% { top: 100%; }
        }
        
        .border-scan::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent-alt), transparent);
            animation: border-scan-h 3s linear infinite;
        }
        .border-scan::after {
            content: '';
            position: absolute;
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, var(--accent-alt), transparent);
            animation: border-scan-v 3s linear infinite;
            animation-delay: 1.5s;
        }
        
        /* Typing indicator pulse */
        @keyframes typing-pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
        }
        
        /* Loading spinner */
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 0.8s linear infinite;
        }
    `;

    // ============================================
    // Special Effects for Gateway
    // ============================================
    const specialEffects = `
        /* Corner decorations for main panels (like login page) */
        .corner-decoration {
            position: absolute;
            width: 16px;
            height: 16px;
            border-color: var(--accent);
            border-style: solid;
            pointer-events: none;
        }
        .corner-tl { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }
        
        /* HUD meter style for stats */
        .hud-meter {
            font-family: var(--font-hud);
            font-size: 24px;
            letter-spacing: 0.1em;
        }
        .hud-label {
            font-family: var(--font-display);
            font-size: 10px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--text-secondary);
        }
        
        /* System online indicator */
        .system-online::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--success);
            border-radius: 50%;
            margin-right: 8px;
            animation: status-pulse 2s ease-in-out infinite;
        }
    `;

    // ============================================
    // Apply All Styles
    // ============================================
    function applyStyles() {
        // Add all style blocks
        GM_addStyle(tokens);
        GM_addStyle(globalStyles);
        GM_addStyle(atmosphericStyles);
        GM_addStyle(utilityStyles);
        GM_addStyle(panelStyles);
        GM_addStyle(gatewayOverrides);
        GM_addStyle(animationStyles);
        GM_addStyle(specialEffects);
        
        // Add atmospheric classes to body
        document.body.classList.add('scanline-overlay');
        document.body.classList.add('noise-overlay');
        
        console.log('[Tactical UI v2] Theme applied successfully');
        console.log('[Tactical UI v2] Features: Division Orange + Arknights Cyan, L1/L2/L3 panels, scanlines');
    }

    // ============================================
    // Initialize
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyStyles);
    } else {
        applyStyles();
    }

    // Debug: Log all class names on body (for selector debugging)
    console.log('[Tactical UI v2] Body classes:', document.body.className);
    
    // Observe for dynamically added content
    const observer = new MutationObserver((mutations) => {
        // Could add dynamic class injection here if needed
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
