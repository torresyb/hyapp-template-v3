module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  // extends: ["plugin:vue/strongly-recommended", "plugin:vue/recommended"],
  globals: { // 配置全局变量及是否允许修改
    "Vue": false,
    "isIos": true,
    "isAndroid": true,
  },
  rules: {
    "for-direction": [2], // for 判断条件中的变量朝着相反的方向变化（这意味判断永远无法达成），会导致死循环。
    "getter-return": [2], // 属性的 getter 一定要有显式的返回值，即使返回 undefined 也应该显式地写出来。
    "no-compare-neg-zero": [2], // 禁止出现 foo === -0 这样的判断，这个判断的行为可能不符合作者的预期。
    "no-cond-assign": [2, "always"], // 禁止在 if/while/for 等判断条件中写赋值语句，以免错看成判断；也有可能本意是想写判断，但错写成了赋值。
    "no-constant-condition": [2], // 禁止在 if/while/for 等判断条件中出现永远不变的判断结果。这种代码通常是因为调试代码忘了删除而导致的。
    "no-control-regex": [2], // 禁止在正则表达式中出现控制字符。
    "no-debugger": [2], // 禁止在代码中通过 debugger 调用调试器。如果需要调试，请在调试器中加断点。
    "no-dupe-args": [2], // 禁止函数出现重名的参数。
    "no-dupe-keys": [2], // 禁止对象字面量出现重名的 key。
    "no-duplicate-case": [2], // 禁止 switch 语句出现重复的 case 。
    "no-empty": [2], // 禁止出现空代码块。
    "no-empty-character-class": [2], // 禁止正则表达式中出现空的集合（比如 / foo[]bar / 中的[]）。包含空集合的正则表达式无法匹配任何字符串。
    "no-ex-assign": [2], // 禁止在 catch (e) {... } 块内对捕获到的异常（e）重新赋值。
    "no-extra-boolean-cast": [2], // 禁止不必要的布尔值转换。在 if 语句或三元表达式等的判断条件中，表达式或值会被自动转换为布尔值，无需手动转换。比如 if (!!foo) {... } 与 if (foo) {... } 是等效的。此时手动转换会让读代码的人困惑。
    "no-func-assign": [2], // 禁止对已声明的函数重新赋值。我们一般不会主动这样做，很有可能是从别处拷代码过来时出现重名了。
    "no-invalid-regexp": [2], // 禁止向 RegExp() 构造函数传入不合法的字符串，这种做法会引发运行时错误。在日常开发中，建议尽可能使用正则表达式字面量。
    "no-irregular-whitespace": [2], // 禁止在代码中的出现非常规的空白符（比如零宽空格等）。这些特殊字符可能引发解析错误，或者对正常的调试和重构带来困扰。这些字符往往是从别处拷代码时混进来的，或者是误按快捷键输入的。如果需要在字符串中包含这些非常规空白符，建议使用其 Unicode 形式。比如 let foo = "\u2008"。
    "no-obj-calls": [2], // 禁止把 Math、JSON 这样的内置对象作为函数进行调用。虽然它们的首字母是大写的，但它们并不是一个构造函数。
    "no-regex-spaces": [2], // 禁止正则表达式中出现多个连续空格。因为很难一眼看清空格的数量。建议在正则表达式中使用 { n } 来表达空格的重复数量，比如 / foo { 3 } bar /。
    "no-sparse-arrays": [2], // 禁止通过数组字面量生成稀疏数组（"稀疏数组" 是指那些不是每个坑都填了值的数组）。在日常开发中不太有理由使用这个特性，大多数情况下是多打了逗号导致的，比如本意想写[1, 2] 但写成了[1,, 2]，就产生了一个稀疏数组。如果确实需要生成一个稀疏数组，可以使用 Array() 来构造，比如 new Array(3) 会生成一个坑数为 3 的稀疏数组。
    "no-unexpected-multiline": [2], // 防止多行代码被（意外地）解析为连续的运算表达式。在采用 "句末不写分号" 风格的代码中比较容易出现这种情况：当第一行末尾没有分号，而第二行开头是(或[等字符时，第二行会视为紧接上一行代码的延续，这往往与预期不符。此时需要在这两行代码之间加分号或 void 关键字，以阻断这种 "粘连效应"。
    "no-unreachable": [2], // 禁止出现不可达的代码，比如 return /throw/break 语句之后的代码是永远不会执行到的。
    "no-unsafe-finally": [2], // 禁止在 finally 块中出现 return /throw 等中止代码流程的语句。因为 finally 块中这些语句的实际执行时机很可能与开发者的预期不符，从而引发 bug。
    "no-unsafe-negation": [2], // 禁止对 in /instanceof 操作符的左侧值使用（意图不明确的）! 运算。比如我们写 !key in object 的本意可能是 !(key in object) 而不是 (!key) in object，但实际的运算顺序是后者。
    "use-isnan": [2], // 禁止在检测 NaN 时使用 foo === NaN 或 foo !== NaN 这样的做法，因为这样判断的结果不符合预期。可以使用 isNaN() 函数来完成这个任务。事实上，在 ES6 + 环境中，建议使用 Number.isNaN() 来检测 NaN，它更健壮一些。
    "valid-typeof": [2], // 强制在做 typeof 判断时总是与合理的值进行比较。比如 typeof foo === 5 永远都不可能相等，没有比较的意义。我们一般不会主动这样写，但笔误无法避免，比如我们很可能会把 "string" 错写成 "stirng" 或 "String"。

    "curly": [2, "multi-line", "consistent"], // 约束 if/while/for 等语句的代码块是否加大括号
    "dot-location": [2, "property"], // 如果要在.操作符这里换行，那么 .是跟着对象留在上一行，还是跟着属性换到下一行？考虑到链式调用语句的易读性，这条规则要求把 .放在行首。
    "eqeqeq": [2, "always", { "null": "ignore" }], // 当我们用 == 或 != 来判断两个不同类型的值时，JS 会采用一些不那么直观易记的判断规则。为避免产出无法预料的 bug，这条规则禁止使用 == 和 !=，我们应该总是使用 === 或 !== 来进行判断。有一个例外是 == null 的写法：由于它可以判出 null 和 undefined，在某些场景下似乎还挺有用，在代码当中也很常见，因此这条规则会放过这种用法。不过并不建议这样写，它很不直观，我们应该采用更明确的判断方法。
    "no-caller": [2], // 在某些情况下，arguments.caller 和 arguments.callee 很好用，但由于 ES5 的严格模式已经禁用了这两者，我们也不应该再使用它们了。
    "no-case-declarations": [2], // 禁止 let /const/function/class 等词法声明出现在 case /default 子句中。
    "no-empty-function": [2], // 禁止出现空函数。
    "no-empty-pattern": [2], // 禁止在解构中出现无意义的解构模式。
    "no-eval": [2], // eval() 是 JS 中的一个特殊的函数，它有诸多问题，在日常开发中似乎没有理由使用它。
    "no-extend-native": [2], // 扩展 Object / Array / Function 等原生对象可能产生不可预料的副作用，在日常开发中似乎也没有理由这样做。如果要 polyfill，交给 专门的库或工具 来完成吧，不要自己写。
    "no-extra-bind": [2], // 如果一个函数内部没有用到 this 关键字，则没有必要对它.bind() 。
    "no-extra-label": [2], // 标签（label）可以帮助我们在多层嵌套的循环中 break/continue 指定的循环。但如果不存在嵌套的情况，也就没必要加标签了，此时加标签反而令人困惑。
    "no-fallthrough": [2], // "Case 穿透" 是 switch 的一个有意思的特性，但有时候也是个坑。因此完全禁用这种行为。
    "no-floating-decimal": [2], // 禁止浮点数在小数点之前或之后省略 0 的写法。
    "no-global-assign": [2], // 禁止修改只读的全局变量。ESLint 怎么知道哪些变量是全局变量并且只读？我们在配置文件中会声明 env 和 globals 字段，ESLint 会通过它们来判断。
    "no-implicit-coercion": [2, { "allow": ["!!", "+"] }], // 禁用隐式的类型转换，因为代码意图往往不清晰。
    "no-implied-eval": [2], // setTimeout() 等函数可能会隐式地调用 eval() ，禁止这种情况。
    "no-lone-blocks": [2], // 禁止不必要的代码块包裹。
    "no-multi-str": [2], // 禁止在字符串中使用转义符来生成多行字符串。
    "no-new-func": [2], // 禁止使用 Function() 来生成函数，它的问题与 eval() 类似。有些模板引擎会用它来编译模板，但在日常开发中似乎没有理由使用它。
    "no-octal": [2], // 禁止使用八进制数字字面量，因为不易读。建议使用 ES6 新增的八进制数字字面量写法。
    "no-octal-escape": [2], // 禁止在字符串中使用八进制转义序列，因为 ES5 已经弃用此特性，而且这种写法不易读。
    "no-return-assign": [2, "always"], // 虽然 return 允许接一个赋值表达式，但这种写法令人困惑
    "no-self-assign": [2], // 禁止把一个变量赋值给自己。
    "no-self-compare": [2], // 禁止对两个相同的变量进行比较。
    "no-sequences": [2], // 禁用不必要的, 操作符。绝大多数时候它都是不直观、不易读的。除了 for 循环以外，在日常开发中似乎没有理由使用它。
    "no-throw-literal": [2], // 禁止 throw 一个字面量，应该总是抛出一个 Error 对象。
    "no-unmodified-loop-condition": [2], // 如果循环的判断条件不会发生变化，则在运行时会产生死循环。这种情况应该是写错了。
    "no-unused-expressions": [2, { "allowShortCircuit": true, "allowTernary": true }], // 禁止无作用的表达式。一个表达式的计算结果被丢弃，则视为 "无作用"，一般是写错了。
    "no-unused-labels": [2], // 标签（label）没有被任何 continue/break 语句用到，将被视为代码写错了。
    "no-useless-call": [2], // Function#call() 和 Function#apply() 可以指定某个方法执行时的 this 指向，很有用。但如果代码中使用这两个函数但并没改变 this 指向，将被视为代码写错了。
    "no-with": [2], // 禁止使用 with 语句。
    "prefer-promise-reject-errors": [2], // 要求 Promise.reject() 只能抛出 Error 对象。
    "radix": [2], // 要求总是给 parseInt() 函数提供第二个参数，以免踩到八进制的坑。
    "require-await": [2], // 要求 async 函数中总是有 await 语句。

    "no-delete-var": [2], // 禁止 delete 变量。只应该 delete 对象的某个属性。
    "no-shadow-restricted-names": [2], // 禁止将受限的名字（比如 NaN、Infinity、undefined 等）作为变量名、参数名。
    "no-undef": [2], // 禁止引用一个未定义的变量，这可能导致一个 ReferenceError，或者无意中创建了一个全局变量。

    "new-cap": [2, { capIsNew: false, properties: true }], // 要求构建函数必须是首字母大写；如果对象的属性作为构建函数，则这个属性也必须是首字母大写。不过首字母大写的函数可以单独调用，并不限制它只能用于 new 操作符。
    "new-parens": [2], // 构造函数在调用时必须写小括号。
    "no-array-constructor": [2], // 禁止通过 Array() 构造函数来创建数组，应该用数组字面量
    "no-bitwise": [2], // 禁用所有的位运算符。
    "no-new-object": [2], // 禁止通过 Object() 构造函数来创建对象，应该用对象字面量：
    "unicode-bom": [2], // 采用 Unicode 编码的文本文件可以在文件的开始用几个字节标注 "字节顺序"（BOM）。

    "constructor-super": [2], //  只有派生 class 才允许调用 super() 。
    "no-class-assign": [2], // 禁止给 class 赋值。
    "no-const-assign": [2], // 禁止给常量赋值。
    "no-dupe-class-members": [2], // 禁止 class 的方法或属性出现重名。出现这种代码通常是因为笔误。
    "no-new-symbol": [2], // Symbol() 看起来像个构造函数，但实际上它是单独调用的。禁止通过 new 操作符来调用它。
    "no-this-before-super": [2], // 派生 class 的构造方法在调用 super() 之前不允许使用 this 和 super 关键字是，否则会产出 ReferenceError。
    "require-yield": [2], // Generator 函数体必须包含 yield 关键字。

    "comma-dangle": [2, "always-multiline"], // 当数组、对象、函数声明的多个成员写成多行时，每个成员的末尾都加逗号；单行不加逗号

    "camelcase": [2], // 针对将引入到本地模块作用域的变量名，使用驼峰命名
    "arrow-parens": [2], // 要求箭头函数的参数使用圆括号
    "arrow-body-style": [2], // 要求箭头函数体使用大括号
    "generator-star-spacing": [2], // 强制 generator 函数中 * 号周围有空格
    "yield-star-spacing": [2], // 强制在 yield* 表达式中 * 周围使用空格
    "multiline-ternary": [2, "always-multiline"], // 要求或禁止在三元操作数中间换行
    "no-multiple-empty-lines": [2], // 不允许多个空行
    "vue/html-self-closing": [0],
    "vue/attribute-hyphenation": ["error", "always" | "never", {
      "ignore": []
    }], // 强制在Vue模板中的自定义组件上使用连字符属性名
    "vue/require-prop-types": ["error"], // 在声明 prop 时，应该指定类型和默认值。
    "vue/require-default-prop": ["error"], // 在声明 prop 时，应该指定类型和默认值。
    "vue/prop-name-casing": ["error", "camelCase"], // 在声明 prop 时，应该总是使用小驼峰式拼写（camelCase）
    "vue/v-bind-style": ["error", "shorthand"], // v-bind: 和 v-on: 指令总是使用简写（: 和 @）。
    "vue/v-on-style": ["error", "shorthand"], // v-bind: 和 v-on: 指令总是使用简写（: 和 @）。
    "vue/html-quotes": ["error", "double" | "single"],
    "vue/html-closing-bracket-newline": [0],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }], // 组件选项的顺序
    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        "UNIQUE",
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "EVENTS",
        "CONTENT"
      ]
    }],
    "vue/require-v-for-key": "error",
    "vue/no-use-v-if-with-v-for": ["error", {
      "allowUsingIterationVar": false
    }],
    "vue/no-shared-component-data": ["error"],
    "vue/component-name-in-template-casing": ["error", "PascalCase", {
      "registeredComponentsOnly": true,
      "ignores": []
    }],

    /**
     * 未启用规则
     */
    "prefer-const": [0], // 如果一个变量不会被重新赋值，最好使用const进行声明。
    "sort-keys": [0], // 要求对象属性按序排列
    "sort-vars": [0], // 要求同一个声明块中的变量按顺序排列
    "sort-imports": [0], // 强制模块内的 import 排序
    "no-console": [0],
  }
}
