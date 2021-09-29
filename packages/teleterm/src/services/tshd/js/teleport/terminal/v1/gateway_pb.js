// source: teleport/terminal/v1/gateway.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.teleport.terminal.v1.Gateway', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.teleport.terminal.v1.Gateway = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.Gateway, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.Gateway.displayName = 'proto.teleport.terminal.v1.Gateway';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.teleport.terminal.v1.Gateway.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.Gateway.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.Gateway} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.Gateway.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    targetCluster: jspb.Message.getFieldWithDefault(msg, 3, ""),
    targetResource: jspb.Message.getFieldWithDefault(msg, 4, ""),
    localAddress: jspb.Message.getFieldWithDefault(msg, 5, ""),
    allowStreaming: jspb.Message.getBooleanFieldWithDefault(msg, 6, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.teleport.terminal.v1.Gateway}
 */
proto.teleport.terminal.v1.Gateway.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.Gateway;
  return proto.teleport.terminal.v1.Gateway.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.Gateway} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.Gateway}
 */
proto.teleport.terminal.v1.Gateway.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetCluster(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetResource(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalAddress(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowStreaming(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.teleport.terminal.v1.Gateway.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.Gateway.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.Gateway} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.Gateway.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTargetCluster();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTargetResource();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getLocalAddress();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAllowStreaming();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string target_cluster = 3;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getTargetCluster = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setTargetCluster = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string target_resource = 4;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getTargetResource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setTargetResource = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string local_address = 5;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getLocalAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setLocalAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool allow_streaming = 6;
 * @return {boolean}
 */
proto.teleport.terminal.v1.Gateway.prototype.getAllowStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setAllowStreaming = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


goog.object.extend(exports, proto.teleport.terminal.v1);
