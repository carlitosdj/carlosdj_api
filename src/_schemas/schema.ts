import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  foreignKey,
  int,
  varchar,
  text,
  double,
  datetime,
  unique,
  float,
} from 'drizzle-orm/mysql-core';
import { Many, relations, sql } from 'drizzle-orm';

//TODO:
export const component = mysqlTable(
  'Component',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    description: text('description'),
    createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
      .notNull(),
    status: varchar('status', { length: 10 }).default('1'),
    order: varchar('order', { length: 191 }),
    duration: int('duration'),
    tags: varchar('tags', { length: 255 }),
    orderby: varchar('orderby', { length: 255 }),
    componentId: int('componentId'),
  },
  (table) => {
    return {
      componentIdIdx: index('Component_componentId_idx').on(table.componentId),
      componentComponentIdComponentIdFk: foreignKey({
        columns: [table.componentId],
        foreignColumns: [table.id],
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const componentRelations = relations(component, ({ one, many }) => ({
  parent: one(component, {
    fields: [component.componentId],
    references: [component.id],
    relationName: 'selfrelation',
  }),
  children: many(component, { relationName: 'selfrelation' }),
  extras: many(componentExtra),
  available: many(componentAvailable),
  completed: many(componentCompleted),
  annotations: many(componentAnnotation),
  comments: many(componentComment),
  access: many(componentAccess),
}));

export const componentAvailable = mysqlTable('ComponentAvailable', {
  id: int('id').primaryKey().autoincrement().notNull(),
  turmaNum: varchar('turmaNum', { length: 255 }).notNull(),
  availableDate: datetime('availableDate', {
    mode: 'string',
    fsp: 3,
  }).notNull(),
  componentId: int('componentId')
    .notNull()
    .references(() => component.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const componentAvailableRelations = relations(
  componentAvailable,
  ({ one }) => ({
    component: one(component, {
      fields: [componentAvailable.componentId],
      references: [component.id],
    }),
  }),
);

export const componentCompleted = mysqlTable('ComponentCompleted', {
  id: int('id').primaryKey().autoincrement().notNull(),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  rate: int('rate').notNull(),
  timeWatched: float('timeWatched'),
  status: varchar('status', { length: 10 }).default('1'),
  userId: int('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  componentId: int('componentId')
    .notNull()
    .references(() => component.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const componentCompletedRelations = relations(
  componentCompleted,
  ({ one }) => ({
    component: one(component, {
      fields: [componentCompleted.componentId],
      references: [component.id],
    }),
  }),
);

export const componentAccess = mysqlTable(
  'ComponentAccess',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
      .notNull(),
    status: varchar('status', { length: 10 }).default('1'),
    userId: int('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    componentId: int('componentId')
      .notNull()
      .references(() => component.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      accessUserComponent: unique('AccessUserComponent').on(
        table.userId,
        table.componentId,
      ),
    };
  },
);

export const componentAccessRelations = relations(
  componentAccess,
  ({ one }) => ({
    component: one(component, {
      fields: [componentAccess.componentId],
      references: [component.id],
    }),
    user: one(user, {
      fields: [componentAccess.userId],
      references: [user.id],
    }),
  }),
);

export const componentExtra = mysqlTable('ComponentExtra', {
  id: int('id').primaryKey().autoincrement().notNull(),
  keyExtra: varchar('keyExtra', { length: 100 }).notNull(),
  valueExtra: text('valueExtra').notNull(),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
  componentId: int('componentId')
    .notNull()
    .references(() => component.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const componentExtraRelation = relations(componentExtra, ({ one }) => ({
  parent: one(component, {
    fields: [componentExtra.componentId],
    references: [component.id],
  }),
}));

export const lead = mysqlTable(
  'Lead',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    whatsapp: varchar('whatsapp', { length: 255 }),
    list: varchar('list', { length: 100 }),
    confirm: int('confirm'),
    segmentacao: varchar('segmentacao', { length: 100 }),
    createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
      .notNull(),
    origin: varchar('origin', { length: 255 }),
    naoperturbe: int('naoperturbe'),
    confirmedAt: datetime('confirmedAt', { mode: 'date', fsp: 3 }),
  },
  (table) => {
    return {
      leadEmailListKey: unique('Lead_email_list_key').on(
        table.email,
        table.list,
      ),
    };
  },
);

export const locationCity = mysqlTable('LocationCity', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  stateId: int('stateId')
    .notNull()
    .references(() => locationState.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const locationCityRelation = relations(locationCity, ({ many }) => ({
  users: many(user),
}));

export const locationState = mysqlTable('LocationState', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  country: int('country').notNull(),
});

export const locationStateRelation = relations(locationState, ({ many }) => ({
  users: many(user),
}));

export const massMail = mysqlTable('MassMail', {
  id: int('id').primaryKey().autoincrement().notNull(),
  list: varchar('list', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message'),
  quantity: int('quantity').notNull(),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
  userId: int('userId').references(() => user.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const user = mysqlTable(
  'User',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    passwordHash: varchar('passwordHash', { length: 60 }),
    authKey: varchar('authKey', { length: 255 }),
    confirmedAt: datetime('confirmedAt', { mode: 'date', fsp: 3 }),
    blockedAt: datetime('blockedAt', { mode: 'date', fsp: 3 }),
    registrationIp: varchar('registrationIp', { length: 45 }),
    createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
      .notNull(),
    flag: int('flag'),
    lastLoginAt: datetime('lastLoginAt', { mode: 'date', fsp: 3 }),
    origin: varchar('origin', { length: 255 }),
    numTurma: int('numTurma'),
    name: varchar('name', { length: 255 }).notNull(),
    bio: text('bio'),
    whatsapp: varchar('whatsapp', { length: 255 }),
    cpf: varchar('cpf', { length: 255 }),
    postalCode: varchar('postalCode', { length: 255 }),
    address: varchar('address', { length: 255 }),
    addressNumber: varchar('addressNumber', { length: 255 }),
    addressDistrict: varchar('addressDistrict', { length: 255 }),
    image: varchar('image', { length: 255 }),
    cityId: int('cityId').references(() => locationCity.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    stateId: int('stateId').references(() => locationState.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    roles: varchar('roles', { length: 60 }),
  },
  (table) => {
    return {
      userEmailKey: unique('User_email_key').on(table.email),
    };
  },
);

export const userRelation = relations(user, ({ one, many }) => ({
  city: one(locationCity, {
    fields: [user.cityId],
    references: [locationCity.id],
  }),
  state: one(locationState, {
    fields: [user.stateId],
    references: [locationState.id],
  }),
  annotations: many(componentAnnotation),
  comments: many(componentComment),
  access: many(componentAccess),
}));

export const wppCamp = mysqlTable('WppCamp', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  slug: varchar('slug', { length: 255 }),
  maxclicks: int('maxclicks'),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
});

export const wppCampRelation = relations(wppCamp, ({ many }) => ({
  wppgroup: many(wppGroup),
}));

export const wppGroup = mysqlTable('WppGroup', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  url: varchar('url', { length: 255 }),
  clicks: int('clicks'),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
  campId: int('campId').references(() => wppCamp.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const wppGroupRelation = relations(wppGroup, ({ one }) => ({
  parent: one(wppCamp, {
    fields: [wppGroup.campId],
    references: [wppCamp.id],
  }),
}));

export const componentAnnotation = mysqlTable('ComponentAnnotation', {
  id: int('id').primaryKey().autoincrement().notNull(),
  message: text('message').notNull(),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
  userId: int('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  componentId: int('componentId')
    .notNull()
    .references(() => component.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const annotationRelation = relations(componentAnnotation, ({ one }) => ({
  parentComponent: one(component, {
    fields: [componentAnnotation.componentId],
    references: [component.id],
  }),
  parentUser: one(user, {
    fields: [componentAnnotation.userId],
    references: [user.id],
  }),
}));

//TODO:
export const componentComment = mysqlTable(
  'ComponentComment',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    comment: text('comment').notNull(),
    createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
      .notNull(),
    status: varchar('status', { length: 10 }).default('1'),
    userId: int('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    componentId: int('componentId')
      .notNull()
      .references(() => component.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    parentId: int('parentId'),
  },
  (table) => {
    return {
      parentIdIdx: index('Component_componentId_idx').on(table.parentId),
      parentIdFk: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const commentRelation = relations(componentComment, ({ one, many }) => ({
  parentComponent: one(component, {
    fields: [componentComment.componentId],
    references: [component.id],
  }),
  parentUser: one(user, {
    fields: [componentComment.userId],
    references: [user.id],
  }),
  //children: many(componentComment),

  parent: one(componentComment, {
    fields: [componentComment.parentId],
    references: [componentComment.id],
    relationName: 'selfrelation',
  }),
  replies: many(componentComment, { relationName: 'selfrelation' }),
}));

export const contact = mysqlTable('Contact', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message'),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  status: varchar('status', { length: 10 }).default('1'),
});

export const support = mysqlTable('Support', {
  id: int('id').primaryKey().autoincrement().notNull(),
  message: text('message').notNull(),

  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`)
    .notNull(),
  reply: text('reply').notNull(),

  repliedAt: datetime('repliedAt', { mode: 'date', fsp: 3 }),
  status: varchar('status', { length: 10 }).default('1'),
  userId: int('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  adminId: int('adminId').references(() => user.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const supportRelation = relations(support, ({ one }) => ({
  parentUser: one(user, {
    fields: [support.userId],
    references: [user.id],
  }),
  parentAdmin: one(user, {
    fields: [support.adminId],
    references: [user.id],
  }),
}));
