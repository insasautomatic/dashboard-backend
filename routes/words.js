const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  GetHolonomyProperty,
  GetHolonymySynonym,
  GetHolonymyConcept,
  GetHolonymyExample,

  GetMeronymyProperty,
  GetMeronymySynonym,
  GetMeronymyConcept,
  GetMeronymyExample,

  GetModifiesId,
  GetModifiesSynonym,
  GetModifiesConcept,
  GetModifiesExample,

  GetHypernymyId,
  GetHypernymySynonym,
  GetHypernymyConcept,
  GetHypernymyExample,

  GetHyponomyId,
  GetHyponymySynonym,
  GetHyponymyConcept,
  GetHyponymyExample,

  GetOntologyTree,

  GetWord,
  GetWordLike,
  GetCategory,
  GetSynonym,

  GetWordConcept,
  GetWordExample,
} = require("../controllers/words.js");

//@desc TEST
//@route GET
//@access Public
router.get("/");

//@desc Get Word
//@route POST /word/getword
//@access Public
router.post("/getword", [body("word", "word not sent").notEmpty()], GetWord);

//@desc Get Words Options
//@route POST /word/getwordlike
//@access Public
router.post(
  "/getwordlike",
  [body("word", "word not sent").notEmpty()],
  GetWordLike
);

//@desc Get Category
//@route POST /word/get-category
//@access Public
router.post(
  "/get-category",
  [body("category_id", "category_id not sent").notEmpty()],
  GetCategory
);

//@desc Get Words Options
//@route POST /word/getwordconcetp
//@access Public
router.post(
  "/getwordconcept",
  [body("word", "word not sent").notEmpty()],
  GetWordConcept
);

//@desc Get Words Options
//@route POST /word/getwordconcetp
//@access Public
router.post(
  "/getwordexample",
  [body("word", "word not sent").notEmpty()],
  GetWordExample
);

//@desc Get Synonym OR Similar
//@route POST /word/getsynonym
//@access Public
router.post(
  "/getsynonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetSynonym
);

//@desc Get Hypernymy Synonym OR Similar
//@route POST /word/get-hypernymy-id
//@access Public
router.post(
  "/get-hypernymy-id",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHypernymyId
);

//@desc Get Hypernymy Synonym OR Similar
//@route POST /word/gethypernymysynonym
//@access Public
router.post(
  "/get-hypernymy-synonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHypernymySynonym
);

//@desc Get Hypernymy Concept
//@route POST /word/gethypernymyconcept
//@access Public
router.post(
  "/get-hypernymy-concept",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHypernymyConcept
);

//@desc Get Hypernymy Concept
//@route POST /word/gethypernymyexample
//@access Public
router.post(
  "/get-hypernymy-example",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHypernymyExample
);

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Hyponomy Id
//@route POST /word/get-hyponomy-id
//@access Public
router.post(
  "/get-hyponomy-id",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHyponomyId
);

//@desc Get Hyponymy Synonym OR Similar
//@route POST /word/get-hyponymy-synonym
//@access Publi
router.post(
  "/get-hyponomy-synonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHyponymySynonym
);

//@desc Get Hyponomy Concept
//@route POST /word/get-hyponomy-concept
//@access Public
router.post(
  "/get-hyponomy-concept",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHyponymyConcept
);

//@desc Get Hyponomy Example
//@route POST /word/get-hyponomy-example
//@access Public
router.post(
  "/get-hyponomy-example",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHyponymyExample
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@desc Get Holonymy property
//@route POST /word/get-holonymy-property
//@access Public
router.post(
  "/get-holonymy-property",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHolonomyProperty
);

//@desc Get Holonymy Synonym OR Similar
//@route POST /word/get-holonymy-synonym
//@access Public
router.post(
  "/get-holonymy-synonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHolonymySynonym
);

//@desc Get Holonymy Concept
//@route POST /word/get-holonymy-concept
//@access Public
router.post(
  "/get-holonymy-concept",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHolonymyConcept
);

//@desc Get Holonymy Example
//@route POST /word/get-holonymy-example
//@access Public
router.post(
  "/get-holonymy-example",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetHolonymyExample
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@desc Get Meronymy property
//@route POST /word/get-meronymy-property
//@access Public
router.post(
  "/get-meronymy-property",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetMeronymyProperty
);

//@desc Get Holonymy Synonym OR Similar
//@route POST /word/get-holonymy-synonym
//@access Public
router.post(
  "/get-meronymy-synonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetMeronymySynonym
);

//@desc Get Holonymy Concept
//@route POST /word/get-holonymy-concept
//@access Public
router.post(
  "/get-meronymy-concept",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetMeronymyConcept
);

//@desc Get Holonymy Example
//@route POST /word/get-holonymy-example
//@access Public
router.post(
  "/get-meronymy-example",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetMeronymyExample
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@desc Get OntoTree
//@route POST /word/get-onto-tree
//@access Public
router.post(
  "/get-onto-tree",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetOntologyTree
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@desc Get Modifies Id
//@route POST /word/get-modifies-id
//@access Public
router.post(
  "/get-modifies-id",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetModifiesId
);

//@desc Get Modifies Synonym OR Similar
//@route POST /word/get-modifies-synonym
//@access Public
router.post(
  "/get-modifies-synonym",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetModifiesSynonym
);

//@desc Get Modifies Concept
//@route POST /word/get-modifies-concept
//@access Public
router.post(
  "/get-modifies-concept",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetModifiesConcept
);

//@desc Get Modifies Concept
//@route POST /word/get-modifies-example
//@access Public
router.post(
  "/get-modifies-example",
  [body("synset_id", "synset_id not sent").notEmpty()],
  GetModifiesExample
);

//@desc Get Words Concept
//@route POST /word/getwordconcept
//@access Public
router.post(
  "/getwordconcept",
  [body("sysnet_id", "word not sent").notEmpty()],
  GetWordConcept
);

//@desc Get Words Examples
//@route POST /word/getwordexamples
//@access Public
//router.post("/getwordexamples", [body("sysnet_id", "word not sent").notEmpty()], GetWordExample);

//@desc Get Words Examples
//@route POST /word/getwordexamples
//@access Public
//router.post("/getwordcategorie", [body("sysnet_id", "word not sent").notEmpty()], GetWordCategories);

//@desc Get ALL Words
//@route POST /word/getall
//@access Public
//router.post("/getall", [body("sysnet_id", "word not sent").notEmpty()], GetAll);

module.exports = router;
