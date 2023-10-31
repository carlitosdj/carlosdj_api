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
} from 'drizzle-orm/mysql-core';
import { Many, relations, sql } from 'drizzle-orm';

export const component = mysqlTable(
  'Component',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    description: text('description'),
    createdAt: double('created_at'),
    status: int('status').default(1).notNull(),
    order: varchar('order', { length: 191 }),
    duration: int('duration'),
    tags: varchar('tags', { length: 255 }),
    orderby: varchar('orderby', { length: 255 }),
    componentId: int('component_id'),
  },
  (table) => {
    return {
      componentIdIdx: index('Component_component_id_idx').on(table.componentId),
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
  comments: many(componentComment)
}));



export const componentAvailable = mysqlTable('ComponentAvailable', {
  id: int('id').primaryKey().autoincrement().notNull(),
  turmaNum: varchar('turma_num', { length: 255 }).notNull(),
  availableDate: datetime('available_date', {
    mode: 'string',
    fsp: 3,
  }).notNull(),
  componentId: int('component_id')
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
  createdAt: double('created_at').notNull(),
  rate: int('rate').notNull(),
  status: int('status').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  componentId: int('component_id')
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

export const componentExtra = mysqlTable('ComponentExtra', {
  id: int('id').primaryKey().autoincrement().notNull(),
  keyExtra: varchar('key_extra', { length: 100 }).notNull(),
  valueExtra: text('value_extra').notNull(),
  createdAt: double('created_at'),
  status: int('status'),
  componentId: int('component_id')
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
    createdAt: double('created_at'),
    origin: varchar('origin', { length: 255 }),
    naoperturbe: int('naoperturbe'),
    confirmedAt: double('confirmed_at'),
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
  stateId: int('state_id')
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
  createdAt: double('created_at'),
  status: int('status'),
  userId: int('user_id').references(() => user.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const user = mysqlTable(
  'User',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    passwordHash: varchar('password_hash', { length: 60 }),
    authKey: varchar('auth_key', { length: 255 }),
    confirmedAt: int('confirmed_at'),
    blockedAt: int('blocked_at'),
    registrationIp: varchar('registration_ip', { length: 45 }),
    createdAt: double('created_at'),
    updatedAt: double('updated_at'),
    flag: int('flag'),
    lastLoginAt: double('last_login_at'),
    origin: varchar('origin', { length: 255 }),
    numTurma: int('num_turma'),
    name: varchar('name', { length: 255 }).notNull(),
    bio: text('bio'),
    whatsapp: varchar('whatsapp', { length: 255 }),
    cpf: varchar('cpf', { length: 255 }),
    postalCode: varchar('postalCode', { length: 255 }),
    address: varchar('address', { length: 255 }),
    addressNumber: varchar('addressNumber', { length: 255 }),
    addressDistrict: varchar('addressDistrict', { length: 255 }),
    image: varchar('image', { length: 255 }),
    cityId: int('city_id').references(() => locationCity.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    stateId: int('state_id').references(() => locationState.id, {
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
  comments: many(componentComment)
}));

export const wppCamp = mysqlTable('WppCamp', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  slug: varchar('slug', { length: 255 }),
  maxclicks: int('maxclicks'),
  createdAt: double('created_at'),
  status: int('status'),
});

export const wppCampRelation = relations(wppCamp, ({ many }) => ({
  wppgroup: many(wppGroup),
}));

export const wppGroup = mysqlTable('WppGroup', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  url: varchar('url', { length: 255 }),
  clicks: int('clicks'),
  createdAt: double('created_at'),
  status: int('status'),
  campId: int('camp_id').references(() => wppCamp.id, {
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
  createdAt: double('created_at').notNull(),
  status: int('status').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  componentId: int('component_id')
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

export const componentComment = mysqlTable('ComponentComment', {
  id: int('id').primaryKey().autoincrement().notNull(),
  comment: text('comment').notNull(),
  createdAt: double('created_at').notNull(),
  status: int('status').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  componentId: int('component_id')
    .notNull()
    .references(() => component.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const commentRelation = relations(componentComment, ({ one }) => ({
  parentComponent: one(component, {
    fields: [componentComment.componentId],
    references: [component.id],
  }),
  parentUser: one(user, {
    fields: [componentComment.userId],
    references: [user.id],
  }),
}));


export const contact = mysqlTable('Contact', {
  id: int('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message'),
  createdAt: double('created_at'),
  status: int('status'),
});

export const support = mysqlTable('Support', {
  id: int('id').primaryKey().autoincrement().notNull(),
  message: text('message').notNull(),
  
  createdAt: double('created_at'),
  reply: text('reply').notNull(),

  repliedAt: double('replied_at'),
  status: int('status').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  adminId: int('admin_id')
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
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