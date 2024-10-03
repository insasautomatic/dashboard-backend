const { validationResult, matchedData } = require("express-validator");
const mysql = require("mysql");

const dotenv = require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD || "",
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log("error : ", err);
  }

  console.log("connected to database");
});

//@desc Get Word
//@route POST /word/getword
//@access Public
const GetWord = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `select * from wn_word where word = "${data.word}" `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      console.log("result: ", result);
      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Words Options
//@route POST /word/getwordlike
//@access Public
const GetWordLike = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `select word from wn_word where word like "${data.word}%" `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Category
//@route POST /word/get-category
//@access Public
const GetCategory = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_master_category WHERE category_id = ${data.category_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Synonym OR Similar
//@route POST /word/getsynonym
//@access Public
const GetSynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_word WHERE word_id IN (SELECT word_id FROM wn_synset_words WHERE synset_id IN (SELECT similar_synset_id from wn_master_rel_similar where synset_id = ${data.synset_id})) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Words Options
//@route POST /word/getwordconcetp
//@access Public
const GetWordConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT synset_id from wn_synset_words WHERE word_id = (SELECT word_id from wn_word where word = "${data.word}")) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Words Options
//@route POST /word/getwordconcetp
//@access Public
const GetWordExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN (SELECT synset_id from wn_synset_words WHERE word_id = (SELECT word_id from wn_word where word = "${data.word}")) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////// hypernymy //////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Hypernymy Synonym OR Similar
//@route POST /word/get-hypernymy-id
//@access Public
const GetHypernymyId = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_master_rel_hypernymy_hyponymy WHERE parent_synset_id = ${data.synset_id} `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Hypernymy Synonym OR Similar
//@route POST /word/gethypernymysynonym
//@access Public
const GetHypernymySynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT *, CONCAT(parent_synset_id, synset_id) AS concatenated_id FROM wn_word
    INNER JOIN wn_synset_words ON wn_word.word_id = wn_synset_words.word_id
    INNER JOIN wn_master_rel_hypernymy_hyponymy ON wn_synset_words.synset_id = wn_master_rel_hypernymy_hyponymy.child_synset_id
    WHERE wn_master_rel_hypernymy_hyponymy.parent_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Hypernymy Concept
//@route POST /word/gethypernymyconcept
//@access Public
const GetHypernymyConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT child_synset_id FROM wn_master_rel_hypernymy_hyponymy WHERE parent_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Hypernymy Concept
//@route POST /word/gethypernymyexample
//@access Public
const GetHypernymyExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN (SELECT child_synset_id FROM wn_master_rel_hypernymy_hyponymy WHERE parent_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////// hyponymy ///////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Hyponomy Data
//@route POST /word/get-hyponomy-id
//@access Public
const GetHyponomyId = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_master_rel_hypernymy_hyponymy WHERE child_synset_id = ${data.synset_id} `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({ error: err });
      } else {
        //////
        res.status(200).send({ result: result });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: error });
  }
};

//@desc Get Hyponymy Synonym OR Similar
//@route POST /word/get-hyponymy-synonym
//@access Public
const GetHyponymySynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT *, CONCAT(parent_synset_id, synset_id) AS concatenated_id FROM wn_word
    INNER JOIN wn_synset_words ON wn_word.word_id = wn_synset_words.word_id
    INNER JOIN wn_master_rel_hypernymy_hyponymy ON wn_synset_words.synset_id = wn_master_rel_hypernymy_hyponymy.parent_synset_id 
    WHERE wn_master_rel_hypernymy_hyponymy.child_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Hyponymy Concept
//@route POST /word/get-hyponymy-concept
//@access Public
const GetHyponymyConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT parent_synset_id FROM wn_master_rel_hypernymy_hyponymy WHERE child_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Hyponymy Concept
//@route POST /word/get-hyponymy-example
//@access Public
const GetHyponymyExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN (SELECT  parent_synset_id  FROM wn_master_rel_hypernymy_hyponymy WHERE child_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////// holonymy ///////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Holonymy property
//@route POST /word/get-holonymy-property
//@access Public

const GetHolonomyProperty = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    /*     let sql = `SELECT * FROM wn_master_property_meronymy_holonymy WHERE mero_holo_property_id IN (SELECT mero_holo_property_id from wn_master_rel_meronymy_holonymy WHERE part_synset_id = ${data.synset_id}) `;
     */

    let sql = `SELECT p.mero_holo_property_value, mh.whole_synset_id
    FROM wn_master_property_meronymy_holonymy p
    INNER JOIN wn_master_rel_meronymy_holonymy mh ON p.mero_holo_property_id = mh.mero_holo_property_id
    WHERE mh.part_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({ error: err });
      } else {
        //////
        res.status(200).send({ result: result });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: error });
  }
};

//@desc Get Holonymy Synonym OR Similar
//@route POST /word/get-holonymy-synonym
//@access Public
const GetHolonymySynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT *, CONCAT(whole_synset_id, synset_id) AS concatenated_id FROM wn_word
    INNER JOIN wn_synset_words ON wn_word.word_id = wn_synset_words.word_id
    INNER JOIN wn_master_rel_meronymy_holonymy ON wn_synset_words.synset_id = wn_master_rel_meronymy_holonymy.whole_synset_id 
    WHERE wn_master_rel_meronymy_holonymy.part_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Holonymy Concept
//@route POST /word/get-holonymy-concept
//@access Public
const GetHolonymyConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT whole_synset_id FROM wn_master_rel_meronymy_holonymy WHERE part_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Holonymy Concept
//@route POST /word/get-holonymy-example
//@access Public
const GetHolonymyExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN (SELECT whole_synset_id FROM wn_master_rel_meronymy_holonymy WHERE part_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////// meronymy ///////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Meronymy property
//@route POST /word/get-meronymy-property
//@access Public
const GetMeronymyProperty = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    /*     let sql = `SELECT * FROM wn_master_property_meronymy_holonymy WHERE mero_holo_property_id IN (SELECT mero_holo_property_id from wn_master_rel_meronymy_holonymy WHERE whole_synset_id = ${data.synset_id}) `;
     */
    let sql = `SELECT p.mero_holo_property_value, mh.part_synset_id
     from wn_master_property_meronymy_holonymy p INNER JOIN wn_master_rel_meronymy_holonymy mh
      ON p.mero_holo_property_id = mh.mero_holo_property_id 
       WHERE mh.whole_synset_id = ${data.synset_id} `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({ error: err });
      } else {
        //////
        res.status(200).send({ result: result });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: error });
  }
};

//@desc Get Meronymy Synonym OR Similar
//@route POST /word/get-meronymy-synonym
//@access Public
const GetMeronymySynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT *, CONCAT(part_synset_id, synset_id) AS concatenated_id FROM wn_word
    INNER JOIN wn_synset_words ON wn_word.word_id = wn_synset_words.word_id
    INNER JOIN wn_master_rel_meronymy_holonymy ON wn_synset_words.synset_id = wn_master_rel_meronymy_holonymy.part_synset_id 
    WHERE wn_master_rel_meronymy_holonymy.whole_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Meronymy Concept
//@route POST /word/get-meronymy-concept
//@access Public
const GetMeronymyConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT part_synset_id FROM wn_master_rel_meronymy_holonymy WHERE whole_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Meronymy Concept
//@route POST /word/get-meronymy-example
//@access Public
const GetMeronymyExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN (SELECT part_synset_id FROM wn_master_rel_meronymy_holonymy WHERE whole_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////// GetOntologyTree ///////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get OntoTree
//@route POST /word/get-onto-tree
//@access Public
const GetOntologyTree = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_master_ontology_nodes WHERE onto_id IN (SELECT onto_nodes_id FROM wn_master_ontology_synset_map WHERE synset_id = ${data.synset_id})`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////// Modifies ///////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//@desc Get Modifies Id
//@route POST /word/get-modifies-id
//@access Public
const GetModifiesId = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_master_rel_adjective_modifies_noun WHERE adjective_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Modifies Synonym OR Similar
//@route POST /word/get-modifies-synonym
//@access Public
const GetModifiesSynonym = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT *, CONCAT(noun_synset_id, synset_id) AS concatenated_id FROM wn_word
    INNER JOIN wn_synset_words ON wn_word.word_id = wn_synset_words.word_id
    INNER JOIN wn_master_rel_adjective_modifies_noun ON wn_synset_words.synset_id = wn_master_rel_adjective_modifies_noun.noun_synset_id 
    WHERE wn_master_rel_adjective_modifies_noun.adjective_synset_id = ${data.synset_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Modifies Concept
//@route POST /word/get-modifies-concept
//@access Public
const GetModifiesConcept = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset WHERE synset_id IN (SELECT noun_synset_id FROM wn_master_rel_adjective_modifies_noun WHERE adjective_synset_id = ${data.synset_id}) `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

//@desc Get Modifies Concept
//@route POST /word/get-modifies-example
//@access Public
const GetModifiesExample = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log("data: ", req.body, data);

  try {
    let sql = `SELECT * FROM wn_synset_example WHERE synset_id IN(SELECT noun_synset_id FROM wn_master_rel_adjective_modifies_noun WHERE adjective_synset_id = ${data.synset_id})  `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log("error: ", err);
      }
      //////

      res.status(201).send({ result: result });
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: error });
  }
};

module.exports = {
  GetWord,
  GetWordLike,
  GetCategory,
  GetWordConcept,
  GetWordExample,
  GetSynonym,
  GetHypernymySynonym,
  GetHypernymyConcept,
  GetHypernymyExample,
  GetHypernymyId,
  GetHyponomyId,
  GetHyponymySynonym,
  GetHyponymyConcept,
  GetHyponymyExample,
  GetHolonomyProperty,
  GetHolonymySynonym,
  GetHolonymyConcept,
  GetHolonymyExample,
  GetMeronymyProperty,
  GetMeronymySynonym,
  GetMeronymyConcept,
  GetMeronymyExample,
  GetOntologyTree,
  GetModifiesId,
  GetModifiesSynonym,
  GetModifiesConcept,
  GetModifiesExample,
};
