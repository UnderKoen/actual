import { type ScheduleEntity } from './schedule';
import { TransactionEntity } from './transaction';

export interface NewRuleEntity {
  stage: string;
  conditionsOp: 'or' | 'and';
  conditions: RuleConditionEntity[];
  actions: RuleActionEntity[];
  tombstone?: boolean;
}

export interface RuleEntity extends NewRuleEntity {
  id: string;
}

export type RuleConditionOp =
  | 'is'
  | 'isNot'
  | 'oneOf'
  | 'notOneOf'
  | 'isapprox'
  | 'isbetween'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'doesNotContain'
  | 'hasTags'
  | 'matches';

type FieldValueTypes = {
  account: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
  payee: string;
  imported_payee: string;
  saved: string;
};

type BaseConditionEntity<
  Field extends keyof FieldValueTypes,
  Op extends RuleConditionOp,
> = {
  field: Field;
  op: Op;
  value: Op extends 'oneOf' | 'notOneOf'
    ? Array<FieldValueTypes[Field]>
    : FieldValueTypes[Field];
  options?: {
    inflow?: boolean;
    outflow?: boolean;
    month?: boolean;
    year?: boolean;
  };
  conditionsOp?: string;
  type?: 'id' | 'boolean' | 'date' | 'number';
  customName?: string;
};

export type RuleConditionEntity =
  | BaseConditionEntity<
      'account',
      | 'is'
      | 'isNot'
      | 'oneOf'
      | 'notOneOf'
      | 'contains'
      | 'doesNotContain'
      | 'matches'
    >
  | BaseConditionEntity<
      'category',
      | 'is'
      | 'isNot'
      | 'oneOf'
      | 'notOneOf'
      | 'contains'
      | 'doesNotContain'
      | 'matches'
    >
  | BaseConditionEntity<
      'amount',
      'is' | 'isapprox' | 'isbetween' | 'gt' | 'gte' | 'lt' | 'lte'
    >
  | BaseConditionEntity<
      'date',
      'is' | 'isapprox' | 'isbetween' | 'gt' | 'gte' | 'lt' | 'lte'
    >
  | BaseConditionEntity<
      'notes',
      | 'is'
      | 'isNot'
      | 'oneOf'
      | 'notOneOf'
      | 'contains'
      | 'doesNotContain'
      | 'matches'
      | 'hasTags'
    >
  | BaseConditionEntity<
      'payee',
      | 'is'
      | 'isNot'
      | 'oneOf'
      | 'notOneOf'
      | 'contains'
      | 'doesNotContain'
      | 'matches'
    >
  | BaseConditionEntity<
      'imported_payee',
      | 'is'
      | 'isNot'
      | 'oneOf'
      | 'notOneOf'
      | 'contains'
      | 'doesNotContain'
      | 'matches'
    >
  | BaseConditionEntity<'saved', 'is'>
  | BaseConditionEntity<'cleared', 'is'>
  | BaseConditionEntity<'reconciled', 'is'>;

export type RuleActionEntity =
  | SetRuleActionEntity
  | SetSplitAmountRuleActionEntity
  | LinkScheduleRuleActionEntity
  | PrependNoteRuleActionEntity
  | AppendNoteRuleActionEntity;

export interface SetRuleActionEntity {
  field: keyof TransactionEntity & string;
  op: 'set';
  value: unknown;
  options?: {
    splitIndex?: number;
  };
  type?: string;
}

export interface SetSplitAmountRuleActionEntity {
  field: null;
  op: 'set-split-amount';
  value: number;
  options?: {
    splitIndex?: number;
    method: 'fixed-amount' | 'fixed-percent' | 'remainder';
  };
}

export interface LinkScheduleRuleActionEntity {
  field: null;
  op: 'link-schedule';
  value: ScheduleEntity;
  options?: undefined;
}

export interface PrependNoteRuleActionEntity {
  field: null;
  op: 'prepend-notes';
  value: string;
  options?: undefined;
}

export interface AppendNoteRuleActionEntity {
  field: null;
  op: 'append-notes';
  value: string;
  options?: undefined;
}
