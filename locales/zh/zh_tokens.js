/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2026 by
 *  + Kiel University and others
 *    + Department of Computer Science
 *      + Real-Time and Embedded Systems Group
 *
 * This program and the accompanying materials are made
 * available under the terms of the MIT License which
 * is available at https://opensource.org/license/MIT.
 *
 * SPDX-License-Identifier: MIT
 */

// This file contains the Simplified Chinese translations for the block labels, tooltips and warnings.
export const zh_tokens = {
  RAILBLOCKS_PROGRAM_TEXT: '程序',
  RAILBLOCKS_PROGRAM_TOOLTIP:
    '需要执行的程序。\n所有后续命令都应放在此块中。',

  RAILBLOCKS_LOOP_TEXT: '循环',
  RAILBLOCKS_LOOP_TOOLTIP:
    '重复执行此块中的所有代码。',

  RAILBLOCKS_STOP_TEXT: '停止',
  RAILBLOCKS_STOP_TOOLTIP:
    '将轨道设为无速度。',

  RAILBLOCKS_DIR_TEXT: '速度：%1 反向：%2',
  RAILBLOCKS_DIR_TOOLTIP:
    '设置轨道的速度和方向。',
  RAILBLOCKS_DIR_SLOW_TEXT: '慢速',
  RAILBLOCKS_DIR_FULL_TEXT: '全速',

  RAILBLOCKS_CONTACT_WAIT_TEXT:
    '等待直到 %3 的第 %2 个接触点被%1',
  RAILBLOCKS_CONTACT_WAIT_TOOLTIP:
    '等待列车与轨道发生交互。',
  RAILBLOCKS_CONTACT_WAIT_REACHED: '到达',
  RAILBLOCKS_CONTACT_WAIT_PASSED: '通过',
  RAILBLOCKS_CONTACT_WAIT_FIRST: '一',
  RAILBLOCKS_CONTACT_WAIT_SECOND: '二',

  RAILBLOCKS_TIME_WAIT_TEXT:
    '等待 %1 秒',
  RAILBLOCKS_TIME_WAIT_TOOLTIP:
    '等待指定时间。',

  RAILBLOCKS_CROSSING_TEXT: '%1 道口',
  RAILBLOCKS_CROSSING_TOOLTIP:
    '切换道口状态',
  RAILBLOCKS_CROSSING_OPEN: '打开',
  RAILBLOCKS_CROSSING_CLOSE: '关闭',

  RAILBLOCKS_CONDITIONAL_TEXT:
    '如果 %2 的第 %1 个接触点最先被到达\n%3否则如果 %5 的第 %4 个接触点最先被到达',
  RAILBLOCKS_CONDITIONAL_TOOLTIP:
    '根据列车最先到达的轨道执行不同的代码块。',
  RAILBLOCKS_CONDITIONAL_FIRST: '一',
  RAILBLOCKS_CONDITIONAL_SECOND: '二',
  RAILBLOCKS_CONDITIONAL_TEXT_START: '如果',
  RAILBLOCKS_CONDITIONAL_TEXT_MIDDLE: '的接触点',
  RAILBLOCKS_CONDITIONAL_TEXT_END: '最先被到达',
  RAILBLOCKS_CONDITIONAL_TITLE_TEXT: '分支',

  RAILBLOCKS_PARALLEL_TEXT: '并行',
  RAILBLOCKS_PARALLEL_TOOLTIP:
    '同时执行多个代码块。',

  RAILBLOCKS_LIGHTS_TEXT_START: '把灯',
  RAILBLOCKS_LIGHTS_TEXT_END: '设为',
  RAILBLOCKS_LIGHTS_TOOLTIP:
    '将一个或多个灯设置为开启或关闭。\n点击加号/减号可调整灯数量。',
  RAILBLOCKS_LIGHTS_ON: '开启',
  RAILBLOCKS_LIGHTS_OFF: '关闭',

  RAILBLOCKS_TRACK_TEXT_START: '将轨道',
  RAILBLOCKS_TRACK_TEXT_END: '设为',
  RAILBLOCKS_TRACK_TOOLTIP:
    '设置一个或多个轨道的速度和方向。\n点击加号/减号可调整轨道数量。',

  RAILBLOCKS_POINT_TEXT_START: '将道岔',
  RAILBLOCKS_POINT_TEXT_END: '设为',
  RAILBLOCKS_POINT_TOOLTIP:
    '将一个或多个道岔设置为直行或分岔。\n点击加号/减号可调整道岔数量。',
  RAILBLOCKS_POINT_STRAIGHT: '直行',
  RAILBLOCKS_POINT_BRANCH: '分岔',

  RAILBLOCKS_WARNING_UNREACHABLE_STRONG:
    '由于此处代码块包含循环，后续代码块将无法执行。',
  RAILBLOCKS_WARNING_UNREACHABLE_WEAK:
    '由于此处代码块包含循环，后续代码块可能无法执行。',
  RAILBLOCKS_WARNING_EMPTY_INPUT:
    '此代码块存在空输入，将导致语法错误！',
  RAILBLOCKS_WARNING_UNUSED:
    '未使用的代码块'
}
