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

import * as ZhHans from 'blockly/msg/zh-hans'
import { zh_tokens } from './zh_tokens'

export const zh_locale = {
  label: '简体中文',
  locale: ZhHans,
  tokens: zh_tokens,
  htmlLabels: {
    title: 'RailBlocks',
    simulationTitle: '仿真',
    deployTitle: '部署到铁路',
    optionsTitle: '查看开发者信息',
    languageButton: '语言',
    languageMenuLabel: '编辑器语言',
    generatedCodeTitle: '生成的 RailSL',
    logsTitle: '日志',
    deployConfirm: '确定要部署到铁路吗？',
    saveTitle: '保存当前工作区',
    loadTitle: '加载工作区',
    attributionsTitle: '鸣谢',
    attributionsText:
      '图片由用户 jucy_fish（火车图标）、Freepik（沙漏动图）、<a href="https://www.flaticon.com/" title="icons source 1">Flaticon</a> 和 <a href="https://www.svgrepo.com" title="icons source 2">svgrepo</a> 提供。'
  },
  toolboxLabels: {
    setStatements: '设置语句',
    waitStatements: '等待语句',
    controlFlow: '控制流程'
  }
}
